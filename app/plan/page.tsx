"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("latestPlan");

    if (saved) {
      try {
        const parsedSaved = JSON.parse(saved || "{}");

        if (parsedSaved.raw) {
          const cleanJsonString = parsedSaved.raw
            .replace(/```json\n?/, "")
            .replace(/\n?```/, "")
            .trim();

          const parsedPlan = JSON.parse(cleanJsonString || "{}");
          setPlan(parsedPlan);
        } else {
          setError("No plan data found.");
        }
      } catch (err) {
        console.error("Error parsing plan data:", err);
        setError("Failed to parse plan data.");
      }
    } else {
      setError("No saved plan found.");
    }

    setLoading(false);
  }, []);

  const speakPlan = () => {
    if (!plan) return;
    let speech = "";

    // Workout section
    if (plan.workout_plan) {
      plan.workout_plan.forEach((dayPlan: any, idx: number) => {
        speech += `Day ${idx + 1}, ${dayPlan.day}, Focus: ${dayPlan.focus}. `;
        dayPlan.exercises?.forEach((exercise: any) => {
          speech += `${exercise.name}, ${
            exercise.sets ? exercise.sets + " sets, " : ""
          }${exercise.reps ? exercise.reps + " reps, " : ""}${
            exercise.duration ? exercise.duration + ", " : ""
          }${exercise.rest ? "Rest " + exercise.rest + ". " : ""}`;
        });
      });
    }

    // Diet section
    if (plan.diet_plan?.meals) {
      speech += "Diet Plan. ";
      plan.diet_plan.meals.forEach((meal: any) => {
        speech += `${meal.meal_time}: `;
        meal.options?.forEach((option: string) => {
          speech += `${option}. `;
        });
      });
      if (plan.diet_plan.notes) {
        speech += `Notes: ${plan.diet_plan.notes}`;
      }
    }

    const utter = new window.SpeechSynthesisUtterance(speech);
    utter.rate = 1;
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  };

  const downloadPlan = () => {
    if (!plan) return;
    const blob = new Blob([JSON.stringify(plan || "{}", null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fitness-plan.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <span className="loading loading-spinner loading-lg text-blue-600 mb-4"></span>
        <span className="font-bold text-xl text-blue-800 dark:text-blue-300">
          Loading your plan...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-3xl shadow-2xl border border-blue-200 dark:border-gray-700 text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary px-6 py-2 rounded-full"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-3xl shadow-2xl border border-blue-200 dark:border-gray-700 text-center max-w-md">
          <div className="text-yellow-500 text-6xl mb-4">💪</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            No Plan Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please generate your fitness plan first.
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary px-6 py-2 rounded-full"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-3">
            🏋️‍♂️ Your AI Fitness & Diet Plan
          </h1>
          <p className="text-blue-700 dark:text-blue-300 text-base sm:text-lg">
            Personalized just for you 💡
          </p>
          <div className="flex justify-center items-center gap-4 m-4">
            <button className="btn btn-primary" onClick={speakPlan}>
              🔊 Speak the Plan
            </button>
            <button className="btn btn-primary" onClick={downloadPlan}>
              ⬇️ Download the Plan
            </button>
          </div>
        </div>

        {/* Workout Plan Section */}
        {plan.workout_plan && (
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl border border-blue-200 dark:border-gray-700 p-8 mb-10">
            <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6 flex items-center gap-2">
              💪 Workout Plan
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {plan.workout_plan.map((dayPlan: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-blue-50 dark:bg-gray-800/70 rounded-2xl border border-blue-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">
                      {dayPlan.day}
                    </h3>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                    {dayPlan.focus}
                  </p>

                  <div className="space-y-3">
                    {dayPlan.exercises?.map(
                      (exercise: any, exIndex: number) => (
                        <div
                          key={exIndex}
                          className="bg-white dark:bg-gray-900 p-4 rounded-xl border-l-4 border-blue-400 shadow-sm"
                        >
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                            {exercise.name}
                          </h4>
                          <div className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
                            {exercise.sets && <div>Sets: {exercise.sets}</div>}
                            {exercise.reps && <div>Reps: {exercise.reps}</div>}
                            {exercise.duration && (
                              <div>Duration: {exercise.duration}</div>
                            )}
                            {exercise.rest && <div>Rest: {exercise.rest}</div>}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Diet Plan Section */}
        {plan.diet_plan && (
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl border border-green-200 dark:border-gray-700 p-8">
            <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6 flex items-center gap-2">
              🍽️ Diet Plan
            </h2>

            {plan.diet_plan.notes && (
              <div className="bg-green-50 dark:bg-gray-800 p-4 rounded-xl border-l-4 border-green-400 mb-6">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  📝 Important Notes
                </h3>
                <p className="text-green-800 dark:text-green-200">
                  {plan.diet_plan.notes}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plan.diet_plan.meals?.map((meal: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-green-50 dark:bg-gray-800/70 rounded-2xl border border-green-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                    <span className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    {meal.meal_time}
                  </h3>

                  <div className="space-y-2">
                    {meal.options?.map((option: string, optIndex: number) => (
                      <div
                        key={optIndex}
                        className="flex items-start gap-3 bg-green-100 dark:bg-gray-900 p-3 rounded-lg"
                      >
                        <span className="text-green-500 mt-1">•</span>
                        <p className="text-green-800 dark:text-green-200">
                          {option}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
