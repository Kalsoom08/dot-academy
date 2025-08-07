function MCQCard() {
  const questions = [
    { id: 1, text: "Which of the following is a prime number?", answer: "B" },
    { id: 2, text: "Which of the following is a prime number?", answer: "B" },
    { id: 3, text: "Which of the following is a prime number?", answer: "D" },
    { id: 4, text: "Which of the following is a prime number?", answer: "C" },
    { id: 5, text: "Which of the following is a prime number?", answer: "A" },
    { id: 6, text: "Which of the following is a prime number?", answer: "B" },
    { id: 7, text: "Which of the following is a prime number?", answer: "B" },
    { id: 8, text: "Which of the following is a prime number?", answer: "D" },
    { id: 9, text: "Which of the following is a prime number?", answer: "C" },
    { id: 10, text: "Which of the following is a prime number?", answer: "A" },
  ];

  const options = ['A. 27', 'B. 7', 'C. 33', 'D. 35'];

  return (
    <div className="bg-white lg:w-[60%] md:w-[60%] w-[80%] text-justify  lg:ml-20 md:ml-20 ml-6 mt-8 p-4">
      <h2 className="font-semibold text-lg mb-4">Maths MCQ Class 10 with Answers</h2>
      {questions.map((q) => (
        <div key={q.id} className="mb-4">
          <p className="font-medium">{q.id}. {q.text}</p>
          <ul className="ml-4 space-y-1 text-sm">
            {options.map((opt, i) => {
              const letter = opt.charAt(0);
              const isCorrect = letter === q.answer;
              return (
                <li key={i} className={isCorrect ? "text-[#7D287E] font-semibold" : ""}>
                  {opt}
                </li>
              );
            })}
          </ul>
          <p className="text-sm mt-1">Answer: <span className="text-[#7D287E] font-bold">{q.answer}</span></p>
        </div>
      ))}
    </div>
  );
}
 

export default MCQCard