import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    
    if (!text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "조언 내용을 입력해주세요" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get client IP from headers
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ipAddress = forwarded?.split(",")[0] || realIp || "unknown";

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if IP already submitted
    const { data: existingSubmission } = await supabase
      .from("user_submissions")
      .select("id")
      .eq("ip_address", ipAddress)
      .single();

    if (existingSubmission) {
      return new Response(
        JSON.stringify({ error: "이미 조언을 등록하셨습니다. 한 사람당 하나의 조언만 등록할 수 있습니다." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert advice
    const { data: advice, error: adviceError } = await supabase
      .from("advices")
      .insert({ text: text.trim(), is_default: false })
      .select()
      .single();

    if (adviceError) {
      throw adviceError;
    }

    // Insert user submission record
    const { error: submissionError } = await supabase
      .from("user_submissions")
      .insert({ ip_address: ipAddress, advice_id: advice.id });

    if (submissionError) {
      throw submissionError;
    }

    return new Response(
      JSON.stringify({ success: true, message: "조언이 등록되었습니다" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "조언 등록 중 오류가 발생했습니다" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});