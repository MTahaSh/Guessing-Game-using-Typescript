#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";   


const sleep = (ms = 3500) => new Promise((res,rej)=> setTimeout(res,ms))

async function Welcome()
{
    const KaraokeTitle = chalkAnimation.karaoke("WELCOME TO THE GUESSING GAME!\nLet's Start the game!");
    await sleep();
    KaraokeTitle.stop();

}

let PlayerLife = 5;

async function askQuestion()
{
    
    let randomNumber:number = Math.floor(Math.random() * 20 + 1);
    
    do{
        console.log(`Player Life = ${PlayerLife}`);
        PlayerLife--;
        var que = await inquirer

    .prompt([
        {
            type: "number",
            name: "user_num",
            message: chalk.rgb(250,153,100)("Select any Number between the range of 1 - 20: "),
            validate: (answers: number)=>{
                if(isNaN(answers))
                {
                    return chalk.red(`Please enter a valid number!`);
                }
                return true;
            }
        }
    ]);

    if(que.user_num === randomNumber)
    {
        console.log(chalk.green(`Congratulations. Your guess is right!!!`));
    }
    else if(que.user_num < randomNumber)
    {
        console.log(chalk.red(`Your guess ${que.user_num} is lesser`));
        
    }
    else if(que.user_num > randomNumber){
        console.log(chalk.red(`Your guess ${que.user_num} is greater`));
    }

    }while(PlayerLife!=0 && randomNumber !== que.user_num);

    if(PlayerLife === 0 && randomNumber !== que.user_num)
    {
        console.log(chalk.redBright(`GAME OVER!!`));
        
    }


}

async function StartAgain()
{
    do{
        console.clear();
        await Welcome();
        PlayerLife = 5;
        await askQuestion();
        var restart = await inquirer .prompt([
            {
                type:"input",
                name:"Start_Again",
                message:chalk.rgb(250,153,100)("Would you like to restart the game?: Press Y or N:- ")
            }
        ])
    }while(restart.Start_Again === 'y' || restart.Start_Again === 'Y')
}


StartAgain();
