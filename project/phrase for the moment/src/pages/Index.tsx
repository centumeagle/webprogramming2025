import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [currentAdvice, setCurrentAdvice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

  const fetchRandomAdvice = async () => {
    try {
      setIsLoading(true);
      setIsFading(true);

      // Fetch all advices
      const { data, error } = await supabase
        .from("advices")
        .select("text");

      if (error) throw error;

      if (data && data.length > 0) {
        // Wait for fade out
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Select random advice
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentAdvice(data[randomIndex].text);
        
        // Fade in
        setIsFading(false);
      }
    } catch (error) {
      console.error("Error fetching advice:", error);
      setCurrentAdvice("오늘은 말씀이 없습니다");
      setIsFading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomAdvice();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Title at top with separator */}
      <div className="pt-8 pb-6 text-center border-b border-foreground/10">
        <h1 className="text-title font-semibold tracking-wide">
          책님의 오늘의 말씀
        </h1>
      </div>

      {/* Main content - centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Advice display */}
        <div 
          className={`w-full max-w-lg min-h-[120px] flex items-center justify-center transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-advice leading-relaxed text-center">
            {currentAdvice || "..."}
          </p>
        </div>
      </div>

      {/* Button - positioned between advice and footer */}
      <div className="pb-32 text-center">
        <Button
          onClick={fetchRandomAdvice}
          disabled={isLoading}
          variant="outline"
          size="sm"
          className="text-minimal"
        >
          {isLoading ? "..." : "다른 페이지 펼치기"}
        </Button>
      </div>

      {/* Footer navigation - very small and minimal */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
        <button
          onClick={() => navigate("/participate")}
          className="text-minimal text-muted-foreground hover:text-foreground transition-colors"
        >
          유언 남기기
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="text-minimal text-muted-foreground hover:text-foreground transition-colors"
        >
          제작자에게
        </button>
      </div>
    </div>
  );
};

export default Index;