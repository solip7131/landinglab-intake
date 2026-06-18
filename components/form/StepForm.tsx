'use client';
import { useState, useCallback } from 'react';
import { FormData, initialFormData } from '@/lib/types';
import { isStepValid } from '@/lib/validation';
import ProgressBar from './ProgressBar';
import NavButtons from './NavButtons';
import Intro from './Intro';
import Outro from './Outro';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import Step9 from './Step9';

const TOTAL_STEPS = 9;

// Step 0 = Intro, 1–9 = form steps, 10 = Outro
export default function StepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const goNext = useCallback(async () => {
    if (currentStep === 9) {
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('submit failed');
        setDirection('forward');
        setCurrentStep(10);
      } catch {
        alert('제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    setDirection('forward');
    setCurrentStep((s) => s + 1);
  }, [currentStep, formData]);

  const goPrev = useCallback(() => {
    if (currentStep > 0 && currentStep < 10) {
      setDirection('backward');
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setFormData(initialFormData);
    setDirection('forward');
    setCurrentStep(0);
  }, []);

  const isValid = isStepValid(currentStep, formData);
  const showProgress = currentStep >= 1 && currentStep <= 9;
  const showPrev = currentStep > 0 && currentStep < 10;
  const showNav = currentStep < 10;

  const getNextLabel = () => {
    if (currentStep === 0) return '시작하기 →';
    if (currentStep === 9) return '제출하기';
    return '다음 →';
  };

  const stepProps = { formData, updateField };

  const renderStep = () => {
    switch (currentStep) {
      case 0:  return <Intro />;
      case 1:  return <Step1 {...stepProps} />;
      case 2:  return <Step2 {...stepProps} />;
      case 3:  return <Step3 {...stepProps} />;
      case 4:  return <Step4 {...stepProps} />;
      case 5:  return <Step5 {...stepProps} />;
      case 6:  return <Step6 {...stepProps} />;
      case 7:  return <Step7 />;
      case 8:  return <Step8 {...stepProps} />;
      case 9:  return <Step9 {...stepProps} />;
      case 10: return <Outro onReset={handleReset} />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-[480px] bg-white min-h-screen flex flex-col shadow-sm">
      {showProgress && <ProgressBar current={currentStep} total={TOTAL_STEPS} />}

      <div
        key={`step-${currentStep}-${direction}`}
        className={`flex-1 px-5 pt-6 pb-[100px] overflow-y-auto ${
          direction === 'forward'
            ? 'animate-slide-in-right'
            : 'animate-slide-in-left'
        }`}
      >
        {renderStep()}
      </div>

      {showNav && (
        <NavButtons
          showPrev={showPrev}
          onPrev={goPrev}
          onNext={goNext}
          isValid={isValid}
          nextLabel={getNextLabel()}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
