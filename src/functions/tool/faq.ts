import { logo } from "../../prints/logo";
import { createString } from "../utils/createString";
import { getTheme } from "../utils/getTheme";
import mainMenu from "./main";

export default function faq(client, rl) {
  let i = 0;
  let askedQuestions = [
    {
      question: "It says unknown server",
      response: "Make sure your bot is in the server you want to nuke",
    },
    {
      question: "Where do I get help?",
      response: "Join: https://discord.gg/zQhPxMsG9v",
    },
    {
      question: "What is a server id?",
      response: "Each server has its own id that you need to nuke",
    },
    {
      question: "How do I get a server ID?",
      response: "Discord settings > Advanced > Developer mode",
    },
    {
      question: "How do I get another key?",
      response: "One key per person but you can ask for another",
    },
    {
      question: "How do I change my password?",
      response: "As of right now, You cannot change your password",
    },
    {
      question: "Where's newest version?",
      response:
        "You will be notified through the nuker if a new version is out",
    },
    
  ];

  function continueFaq() {
    console.clear();

    let mainColor = getTheme();
    let index = askedQuestions[i];

    logo();
    console.log(" ");
    console.log(
      createString(
        `${mainColor("Question")}: ${index.question}`,

        "semi"
      )
    );
    console.log(
      createString(
        `${mainColor("Answer")}: ${index.response}`,

        "semi"
      )
    );
    console.log(" ");
    if (i + 1 === askedQuestions.length) {
      console.log(" ");
      console.log(createString("FAQ completed", "semi"));
      setTimeout(() => {
        rl.question(createString("Type anything to continue"), () => {
          mainMenu(client, rl);
        });
      }, 1000);
    } else
      rl.question(createString("Would you like to view another"), (aa) => {
        aa = aa.trim().toLowerCase();

        if (aa === "y" || aa === "yes") {
          i++;
          continueFaq();
        } else if (aa === "n" || aa === "no" || aa === "menu") {
          mainMenu(client, rl);
        } else {
          mainMenu(client, rl);
        }
      });
  }
  continueFaq();
}
