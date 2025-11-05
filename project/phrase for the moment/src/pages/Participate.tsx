import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Participate = () => {
  const [advice, setAdvice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!advice.trim()) {
      toast({
        title: "조언을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-advice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: advice }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: data.error || "오류가 발생했습니다",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "감사합니다",
        description: "당신의 말씀이 추가되었습니다",
      });

      setAdvice("");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast({
        title: "연결 오류",
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
          <h1 className="text-minimal-md font-semibold">유언 남기기</h1>
          <p className="text-minimal text-muted-foreground">
            한 사람당 하나의 말씀만 남길 수 있습니다
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            placeholder="당신의 말씀을 적어주세요..."
            className="min-h-[120px] text-minimal resize-none"
            maxLength={200}
          />
          
          <div className="flex justify-between items-center">
            <span className="text-minimal text-muted-foreground">
              {advice.length}/200
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
                disabled={isSubmitting || !advice.trim()}
                size="sm"
                className="text-minimal"
              >
                {isSubmitting ? "등록 중..." : "등록하기"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Participate;