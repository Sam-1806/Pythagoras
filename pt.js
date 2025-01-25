"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import MathJax from "mathjax";

export default function MathPuzzleInteractive() {
  const [sliderValue, setSliderValue] = useState(5);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState(null);

  // Mathematical concept: Pythagoras' theorem
  const checkAnswer = () => {
    const numericInput = parseFloat(userInput);
    const calculatedHypotenuse = Math.sqrt(3 ** 2 + sliderValue ** 2);

    if (isNaN(numericInput)) {
      setResult("Please enter a valid number.");
    } else if (Math.abs(numericInput - calculatedHypotenuse) < 0.01) {
      setResult("Correct! You solved the puzzle. 🎉");
    } else {
      setResult(`Incorrect. The correct value is approximately ${calculatedHypotenuse.toFixed(2)}.`);
    }
  };

  // Re-render math formulas when component updates
  useEffect(() => {
    MathJax.typeset(); // Automatically process any LaTeX math expressions in the component
  }, [sliderValue, result]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="p-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Can You Solve This Puzzle?</h1>
          <p className="mb-4 text-lg">
            Use the slider below to adjust the length of one side of a right triangle.
            Then, calculate the hypotenuse using the Pythagorean theorem: 
            <span className="font-mono">
              c = \\(\\sqrt{a^2 + b^2}\\)
            </span>
          </p>
          <div className="my-4">
            <label className="block mb-2 font-semibold">Adjust the length of side \(b\):</label>
            <Slider
              value={[sliderValue]}
              onValueChange={(value) => setSliderValue(value[0])}
              min={1}
              max={10}
              step={1}
              className="mb-4"
            />
            <p className="text-sm italic">Current length of \(b\): {sliderValue}</p>
          </div>
          <input
            type="number"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter your calculated hypotenuse..."
          />
          <Button onClick={checkAnswer} className="w-full mb-2">
            Submit Answer
          </Button>
          {result && <p className="mt-4 text-lg font-semibold">{result}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
