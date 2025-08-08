import React from 'react'

const solutions = [
    { question: "She gave me a beautiful _____.", correctAnswer: "Gift", explanation: "The correct answer is 'Gift' because it is a noun, fitting after the adjective 'beautiful'." },
    { question: "They ____ to the market every Sunday.", correctAnswer: "Go", explanation: "The correct answer is 'Go' because the subject 'they' takes the plural form." },
    { question: "The capital of France is _____.", correctAnswer: "Paris", explanation: "The capital of France is 'Paris', which is the central star in our solar system." },
    { question: "The Earth revolves around the _____.", correctAnswer: "Sun", explanation: "The Earth revolves around the 'Sun', which is the central star in our solar system." }
];

function Solutions() {
  return (
    <div className="py-6 flex flex-col gap-8">
            <h1 className="text-[25px] font-bold">Correct Answers</h1>
            {solutions.map((item, index) => (
                <div key={index} className="bg-white p-4 mb-4 border rounded-md">
                    <h2 className="font-semibold text-xl">{item.question}</h2>
                    <p className="text-gray-700">Correct Answer: <strong>{item.correctAnswer}</strong></p>
                    <p className="text-gray-500">{item.explanation}</p>
                </div>
            ))}
        </div>
  )
}

export default Solutions
