interface ProgressBarProps {
  maxQuestions: number;
  currentQuestion: number;
}

export const ProgressBar = ({
  maxQuestions,
  currentQuestion,
}: ProgressBarProps) => {
  //should be fixed, and always be in the bottom left
  //background should be currentQuestion/maxQuestions primary color rest gray
  return (
    <div className="w-full h-8 bg-gray-400 fixed bottom-0 left-0">
      <div
        className="h-full bg-primary"
        style={{
          width: `${(currentQuestion / maxQuestions) * 100}%`,
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        {currentQuestion}/{maxQuestions} Questions
      </div>
    </div>
  );
};
