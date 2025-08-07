import React, { useState, useEffect, useRef } from 'react';

const RiddlerTerminal = () => {
  const [gameState, setGameState] = useState('start');
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [terminalLines, setTerminalLines] = useState([
    ">> THERE YOU ARE. LET'S PLAY A GAME, JUST ME AND YOU. YOU READY?",
    ">> PROCEED? [Y/N]"
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const wickedResponses = [
    ">> PATHETIC. GOTHAM'S CHILDREN COULD DO BETTER THAN YOU.",
    ">> YOUR IGNORANCE IS AS DARK AS THE KNIGHT'S COWL.",
    ">> FOOLISH MORTAL. THE SHADOWS MOCK YOUR FEEBLE MIND.",
    ">> HOW DELICIOUSLY DISAPPOINTING. TRY HARDER, WORM.",
    ">> YOUR FAILURE AMUSES ME GREATLY. DANCE FOR ME, PUPPET."
  ];

  const allRiddles = [
    {
      question: "I AM FIRST A FRAUD OR A TRICK. OR PERHAPS A BLEND OF THE TWO. THAT'S UP TO YOUR MISINTERPRETATION.",
      answer: "confusion",
      correctResponse: "VERY GOOD. HERE'S THE NEXT ONE."
    },
    {
      question: "FEAR HE IS THE REASON, OR THE RESULT. PERHAPS BOTH, PERHAPS NEITHER.",
      answer: "scarecrow",
      correctResponse: "IMPRESSIVE. MOST IMPRESSIVE."
    },
    {
      question: "I'M NOBODY. SOME WOULD SAY I'M THE ONLY HONEST ONE. WHAT AM I?",
      answer: "anonymous",
      correctResponse: "CORRECT. YOU'RE GETTING GOOD AT THIS."
    },
    {
      question: "WHAT'S BLACK AND BLUE AND DEAD ALL OVER?",
      answer: "batman",
      correctResponse: "THE BAT IS BROKEN. EXCELLENT."
    },
    {
      question: "I AM A SYMBOL THAT LIGHTS UP THE SKY, BUT I'M ALSO A CAGE. WHAT AM I?",
      answer: "batsignal",
      correctResponse: "THE CALL AND THE TRAP. BRILLIANT."
    },
    {
      question: "IT CAN BE CRUEL, POETIC, OR BLIND. BUT WHEN IT'S DENIED, IT'S VIOLENCE YOU MAY FIND.",
      answer: "justice",
      correctResponse: "POETIC JUSTICE. WELL DONE."
    },
    {
      question: "THE LESS OF THEM YOU HAVE, THE MORE ONE IS WORTH.",
      answer: "friends",
      correctResponse: "FRIENDSHIP IS RARE IN GOTHAM."
    },
    {
      question: "WHAT COMES AFTER THE KNIGHT?",
      answer: "the fall",
      correctResponse: "EVEN LEGENDS MUST FALL."
    },
    {
      question: "IF YOU ARE JUSTICE PLEASE DO NOT LIE, WHAT IS THE PRICE FOR YOUR BLIND EYE?",
      answer: "BRIBE",
      correctResponse: "GOTHAM'S FINEST CURRENCY."
    },
    {
      question: "I AM THE RENEWAL THAT NEVER COMES.",
      answer: "hope",
      correctResponse: "HOPE IS GOTHAM'S CRUELEST JOKE."
    },
    {
      question: "WHAT'S THE GREATEST RIDDLE OF ALL?",
      answer: "life",
      correctResponse: "LIFE IS THE ULTIMATE PUZZLE."
    },
    {
      question: "WHEN THE CHIPS ARE DOWN, THESE CIVILIZED PEOPLE WILL EAT EACH OTHER. WHAT AM I?",
      answer: "chaos",
      correctResponse: "CHAOS IS THE NATURAL ORDER."
    }
  ];

  // Select 3 random riddles for each game
  const [riddles, setRiddles] = useState([]);
  
  // Initialize riddles when component mounts
  useEffect(() => {
    const selectedRiddles = [];
    const availableIndices = Array.from({ length: allRiddles.length }, (_, i) => i);
    
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const riddleIndex = availableIndices.splice(randomIndex, 1)[0];
      selectedRiddles.push(allRiddles[riddleIndex]);
    }
    
    setRiddles(selectedRiddles);
  }, []);

  const addLine = (text) => {
    setTerminalLines(prev => [...prev, text]);
  };

  const addLineWithDelay = (text, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      addLine(text);
      setIsTyping(false);
    }, delay);
  };

  const handleInput = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      const value = currentInput.toLowerCase().trim();
      
      // Add the user input to terminal (in uppercase)
      addLine(currentInput.toUpperCase());
      setCurrentInput('');

      if (gameState === 'start') {
        if (value === 'y' || value === 'yes') {
          addLineWithDelay(">> READY TO UNCOVER THE TRUTH? LET'S GET STARTED.", 100);
          setTimeout(() => {
            if (riddles.length > 0) {
              addLineWithDelay(">> " + riddles[0].question, 1500);
              setTimeout(() => {
                setGameState('riddle');
              }, 2500);
            }
          }, 500);
        } else if (value === 'n' || value === 'no') {
          addLineWithDelay(">> MAYBE ANOTHER TIME THEN.", 100);
        }
      } else if (gameState === 'riddle') {
        const correctAnswer = riddles[currentRiddle].answer.toLowerCase();
        
        if (value === correctAnswer) {
          addLineWithDelay(">> " + riddles[currentRiddle].correctResponse, 100);
          
          if (currentRiddle < riddles.length - 1) {
            setTimeout(() => {
              addLineWithDelay(">> " + riddles[currentRiddle + 1].question, 1500);
              setTimeout(() => {
                setCurrentRiddle(prev => prev + 1);
                setWrongAttempts(0);
              }, 1500);
            }, 1000);
          } else {
            setTimeout(() => {
              addLineWithDelay(">> WELL DONE. YOU'VE PROVEN YOURSELF WORTHY.", 1500);
              setTimeout(() => {
                addLineWithDelay(">> NOW FOR THE ULTIMATE REVELATION...", 2000);
                setTimeout(() => {
                  addLineWithDelay(">> THE DARK KNIGHT HIMSELF.", 2500);
                  setTimeout(() => {
                    addLineWithDelay(">> BATMAN. THE WORLD'S GREATEST DETECTIVE.", 2000);
                    setTimeout(() => {
                      addLineWithDelay(">> THE BAT'S TRUE IDENTITY... FOLLOW THE SIGNAL:", 2500);
                      setTimeout(() => {
                        addLineWithDelay(">> INSTAGRAM.COM/YOURUSERNAME", 2000);
                        setTimeout(() => {
                          setGameState('complete');
                        }, 2000);
                      }, 2500);
                    }, 2500);
                  }, 2500);
                }, 2000);
              }, 2500);
            }, 1000);
          }
        } else {
          const randomWickedResponse = wickedResponses[Math.floor(Math.random() * wickedResponses.length)];
          addLineWithDelay(randomWickedResponse, 100);
          setWrongAttempts(prev => prev + 1);
        }
      }
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current && !isTyping && gameState !== 'complete') {
      inputRef.current.focus();
    }
  }, [terminalLines, isTyping, gameState]);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono text-xl leading-relaxed p-5 relative overflow-hidden">
      <div 
        ref={terminalRef}
        className="h-screen overflow-y-auto pb-20"
        onClick={() => inputRef.current?.focus()}
      >
        {terminalLines.map((line, index) => (
          <div key={index} className="mb-2">
            {line.includes('INSTAGRAM.COM/') ? (
              <span>
                {line.split('INSTAGRAM.COM/')[0]}
                <a 
                  href={`https://www.instagram.com/atherva_innit/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 underline hover:text-green-300 cursor-pointer"
                >
                  GAME OVER! BATMAN...
                </a>
              </span>
            ) : (
              line
            )}
          </div>
        ))}
        
        {gameState !== 'complete' && (
          <div className="mb-2 relative">
            <span>{currentInput}</span>
            <span className="animate-pulse">&lt;?&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value.toUpperCase())}
              onKeyPress={handleInput}
              className="absolute top-0 left-0 bg-transparent border-none outline-none text-transparent font-mono text-xl w-full uppercase caret-transparent"
              autoComplete="off"
              disabled={isTyping}
            />
          </div>
        )}
      </div>

      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 text-center z-10 bg-black px-4 py-2">
        <div className="space-x-4 whitespace-nowrap">
          <span className="cursor-pointer hover:text-gray-400">PRIVACY POLICY</span>
          <span className="cursor-pointer hover:text-gray-400">TERMS OF USE</span>
          <span className="cursor-pointer hover:text-gray-400">AD CHOICES</span>
          <span className="cursor-pointer hover:text-gray-400">DO NOT SELL MY PERSONAL INFORMATION</span>
          <span className="cursor-pointer hover:text-gray-400">CREDITS & RATINGS</span>
        </div>
        <div className="mt-1">© 2025 AtWritesProgs</div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default RiddlerTerminal;