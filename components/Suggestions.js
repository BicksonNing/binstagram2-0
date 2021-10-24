import { useEffect, useState } from "react";
import faker from "faker";
import Suggestion from "./Suggestion";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className=''>
      <div className='flex items-center justify-between'>
        <p className='text-gray-500 font-semibold'>Suggestions For You</p>
        <button className='font-semibold text-sm'>See All</button>
      </div>

      <div>
        {suggestions.map((suges) => (
          <Suggestion
            key={suges.id}
            userImg={suges.avatar}
            username={suges.username}
          />
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
