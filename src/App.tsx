import "./styles.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";

interface AnalogiesProps {
  elems: string[];
}

let randomListIndex = (l: string[]) => {
  return Math.floor(Math.random() * l.length);
};

function GenerateAnalogy({ elems }: AnalogiesProps) {
  if (undefined !== elems && elems.length) {
    const firstIndex = randomListIndex(elems);
    let secondIndex = randomListIndex(elems);
    while (secondIndex === firstIndex) {
      secondIndex = randomListIndex(elems);
    }
    const first = elems[firstIndex];
    const second = elems[secondIndex];
    return (
      <div>
        <b>{first}</b> is like <b>{second}</b> because ...{" "}
      </div>
    );
  }
  return <div>Elems seem to be empty!</div>;
}

type GameSettings = {
  speed: number;
  rounds: number;
};

function ExecuteGame({ speed, rounds }: GameSettings) {
  let analogies: string[] = ["hardwood floor", "marriage", "sleep", "lion"];

  for (let i = 0; i <= rounds; i++) {
    console.log("Block statement execution no." + i);
    {
      /* return <GenerateAnalogy elems={analogies} /> */
    }
  }
}

export const GameSettingsForm = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit
  } = useForm<GameSettings>();
  const onSubmit: SubmitHandler<GameSettings> = (data) => ExecuteGame(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="speed">
          Speed is <b>{watch("speed")}</b> seconds:{" "}
        </label>
        <input
          type="range"
          id="speed"
          min="1"
          max="10"
          step="1"
          defaultValue="4"
          {...register("speed", { required: true })}
        />
        {errors.speed && "Missing speed"}
      </div>
      <div className="field">
        <label htmlFor="rounds">Rounds</label>
        <input
          type="number"
          id="rounds"
          {...register("rounds", { min: 1, max: 20, required: true })}
        />
        {errors.rounds && "Wrong input of rounds"}
      </div>
      <button type="submit">Go</button>
    </form>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Analogies app!</h1>
      Choose game settings:
      <GameSettingsForm />
      {/* <GenerateAnalogy elems={analogies} /> */}
    </div>
  );
}
