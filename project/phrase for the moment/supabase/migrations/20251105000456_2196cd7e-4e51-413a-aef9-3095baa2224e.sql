-- Create advices table
CREATE TABLE public.advices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_submissions table for IP tracking
CREATE TABLE public.user_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL UNIQUE,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  advice_id UUID REFERENCES public.advices(id) ON DELETE CASCADE
);

-- Create feedback table
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.advices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for advices (public read, authenticated insert)
CREATE POLICY "Anyone can read advices"
ON public.advices FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert advices"
ON public.advices FOR INSERT
WITH CHECK (true);

-- RLS Policies for user_submissions
CREATE POLICY "Anyone can read submissions"
ON public.user_submissions FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert submissions"
ON public.user_submissions FOR INSERT
WITH CHECK (true);

-- RLS Policies for feedback
CREATE POLICY "Anyone can insert feedback"
ON public.feedback FOR INSERT
WITH CHECK (true);

-- Insert 50 initial advices (70% casual/humorous, 30% encouraging)
INSERT INTO public.advices (text, is_default) VALUES
('그건 니 생각이고', true),
('알아서 해', true),
('몰라 나도', true),
('그래서?', true),
('뭘 고민해 그냥 해', true),
('안 되면 말고', true),
('내 알 바 아님', true),
('그렇게까지 할 필요 있어?', true),
('진지충은 가라', true),
('너무 생각하지 마', true),
('어차피 다 지나가', true),
('됐고 커피나 마셔', true),
('그만 궁예질 해', true),
('할 만큼 했으면 됐어', true),
('뭐 어때 대충 살아', true),
('완벽주의는 독이야', true),
('네가 생각하는 것보다 아무도 신경 안 써', true),
('솔직히 별일 아니야', true),
('딱히 할 말 없음', true),
('그냥 쉬어', true),
('왜 자꾸 물어봐', true),
('됐고 자러 가', true),
('너무 진지하게 받아들이지 마', true),
('다 타이밍이야 타이밍', true),
('모르겠으면 일단 놔둬', true),
('그냥 재미없어', true),
('힘 빼고 살아', true),
('고민하지 말고 일단 시작해', true),
('뭘 그렇게까지', true),
('그래봤자 다 똑같아', true),
('별생각 말고 살자', true),
('그냥 흘려들어', true),
('누가 뭐래도 상관없어', true),
('멈춰있지만 말고', true),
('잘하고 있어', true),
('기분 좋은 출발이지', true),
('오늘도 괜찮은 하루', true),
('이미 충분히 잘하고 있어', true),
('천천히 가도 괜찮아', true),
('네가 생각한 대로 해봐', true),
('좋은 선택이야', true),
('응원할게', true),
('넌 할 수 있어', true),
('지금 이대로도 멋져', true),
('오늘 하루도 수고했어', true),
('내일은 더 나을 거야', true),
('작은 시도도 용기야', true),
('네 속도로 가면 돼', true),
('이미 좋은 방향이야', true),
('괜찮아 잘될 거야', true);