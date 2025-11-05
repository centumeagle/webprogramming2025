import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "메시지를 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("feedback")
        .insert({ message: message.trim() });

      if (error) throw error;

      toast({
        title: "감사합니다",
        description: "메시지가 전달되었습니다",
      });

      setMessage("");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast({
        title: "오류",
        description: "다시 시도해주세요",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-minimal-md font-semibold">제작자에게</h1>
          <p className="text-minimal text-muted-foreground">
            의견이나 제안을 남겨주세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="하실 말씀을..."
            className="min-h-[150px] text-minimal resize-none"
            maxLength={500}
          />
          
          <div className="flex justify-between items-center">
            <span className="text-minimal text-muted-foreground">
              {message.length}/500
            </span>
            <div className="space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-minimal"
              >
                돌아가기
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                size="sm"
                className="text-minimal"
              >
                {isSubmitting ? "전송 중..." : "보내기"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;