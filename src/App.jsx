import { useEffect, useState } from "react";
import topics from "./topics.json";

console.log({ topics });

const pick = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const colorPalette = [
  "#add8e6", // Light Blue
  "#98fb98", // Pale Green
  "#ffdab9", // Soft Peach
  "#e6e6fa", // Lavender Mist
  "#f5fffa", // Mint Cream
  "#c0c0c0", // Silver Gray
  "#ffebcd", // Blanched Almond
  // "#8470ff", // Light Slate Blue
  "#afeeee", // Pale Turquoise
  "#fff0f5" // Lavender Blush
];

const generateInitialTopic = () => {
  let topic = pick(topics);
  return { ...topic, color: pick(colorPalette) };
};

const initialTopic = generateInitialTopic();

function App() {
  const [currentTopic, setTopic] = useState(initialTopic);
  const [topicHistory, setTopicHistory] = useState([initialTopic]);

  const pickNewTopic = () => {
    const topicsLength = topics.length;
    const recentTopicList = topicHistory.slice(((topicHistory.length - 1) % topicsLength) * -1);
    const newTopic =
      pick(topics.filter(x => !recentTopicList.some(y => y.id === x.id))) || pick(topics);

    newTopic.color = pick(colorPalette.filter(x => x !== currentTopic.color));
    setTopic(newTopic);
    setTopicHistory(prev => [...prev, newTopic]);
  };

  const back = () => {
    if (topicHistory.length < 2) return;
    const previousTopic = topicHistory[topicHistory.length - 2];
    setTopic(previousTopic);
    setTopicHistory(prev => prev.slice(0, prev.length - 1));
  };

  useEffect(() => {
    document.body.style.background = currentTopic.color;
  }, [currentTopic.color]);

  return (
    <>
      <div id="display">
        {currentTopic && (
          <>
            <h1>{currentTopic.header}</h1>
            <ul>
              {currentTopic.examples.map(x => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div id="control">
        <button onClick={back} disabled={topicHistory.length < 2}>
          Back
        </button>
        <button onClick={pickNewTopic}>New topic</button>
      </div>
    </>
  );
}

export default App;
