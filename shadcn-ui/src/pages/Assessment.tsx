
      }
    };

    fetchAndCreateAssessment();
  }, [id]);

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestionIndex < (assessment?.questions.length ?? 0) - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Pass the original assessment object which includes all questions for scoring
        const originalAssessmentData = {
            id: assessment?.id,
            title: assessment?.title,
            questions: assessment?.questions
        }
        navigate(`/assessment/${id}/results`, { state: { answers: newAnswers, assessment: originalAssessmentData } });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="mt-4 text-lg text-gray-600">Loading Assessment...</p>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="mt-4 text-lg text-red-600">{error || 'Could not load the assessment.'}</p>
        <Button onClick={() => navigate('/create-trust-tag')} className="mt-4">Back to Skill Selection</Button>
      </div>
    );
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>{assessment.title}</CardTitle>
            <CardDescription>Question {currentQuestionIndex + 1} of {assessment.questions.length}</CardDescription>
            <Progress value={progress} className="w-full mt-2" />
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-lg mb-4">{currentQuestion.question}</p>
            <RadioGroup value={selectedAnswer ?? ''} onValueChange={setSelectedAnswer}>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-100">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button onClick={handleNextQuestion} disabled={!selectedAnswer} className="w-full">
              {currentQuestionIndex < assessment.questions.length - 1 ? 'Next Question' : 'Finish Assessment'}
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
