import React from "react";
import Card from "../../components/Cards/Card";
import SpendImg from "../../assets/Images/landing page/after-login/spend.png";
import WorthImg from "../../assets/Images/landing page/after-login/worth.png";
import SavingImg from "../../assets/Images/landing page/after-login/Saving.png";

const PracticeTest = () => {
  const cardContent = [
    { title: "QUIZ: Saving vs Investing", img: SpendImg },
    { title: "QUIZ: Is it worth it?", img: WorthImg },
    { title: "GAME: Spending Check!", img: SavingImg },
  ];
  return (
    <div>
      <div className="text-text-g mb-10">
        <div>
          <h2 className="text-4xl font-body font-bold mb-16">Practice Test</h2>
        </div>
        <div className="flex justify-center gap-8">
          {cardContent.map((item, index) => (
            <Card key={index} title={item.title} img={item.img} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeTest;
