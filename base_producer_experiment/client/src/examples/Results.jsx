import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { usePlayer } from "@empirica/core/player/classic/react";
import { useRef } from "react";

export function SalesResults({roundNumber}) {
  console.log('calculating advertiser score');
  const player = usePlayer();
  const roundNumberText = 'round' + roundNumber;
  
  //const adQuality = player.get("adQuality");
  const productionQuality = player.get(roundNumberText.concat("_choices"))[0]
  const advertisementQuality = player.get(roundNumberText.concat("_choices"))[1]
  const priceOfProduct = player.get(roundNumberText.concat("_choices"))[2]
  const productionCost = player.get(roundNumberText.concat("_choices"))[3]
  const warrantChoice = player.get(roundNumberText.concat("_choices"))[4];
  console.log('warrantChoice', warrantChoice)
  let warrantPrice = 0
  let randomNum;
  let playerWarrantChallenge;
  // if warrantchoice is yes, then we generate number to see if player is challenged
  // if not, then player cannot challenge
  console.log("warrantChoice value before if statement: ", warrantChoice);

  // if warrantChoice is yes, then we set warrantPrice to 100 
  // and generate a random number to see if the player is challenged
  if (warrantChoice === 'Yes') {
    console.log("Inside warrantChoice === 'Yes'");
    warrantPrice = 100;
    randomNum = Math.random();
    if (randomNum > 0.5) {
      playerWarrantChallenge = true;
    } else {
      playerWarrantChallenge = false;
    }
  console.log('warrantchoice p2');
} else {
  console.log("Inside else block of warrantChoice");
}

  let imageUrl = "";
  //console.log('roundNumberText', roundNumberText)
  if (advertisementQuality === "high") {
    imageUrl = "/images/toothpaseamazing.jpg"; // Replace with the actual URL for high quality
  } else if (advertisementQuality === "low") {
    imageUrl = "/images/toothpastestandard.jpg"; // Replace with the actual URL for low quality
  }

  const currentScore = player.get("score") || 0; // , adQuality, points, salesCount, numBuyers
  
  let points = priceOfProduct;

  const min = 10;
  const max = 90;
  
  //  switch (advertisementQuality){
  //    case "high":
  //      switch (priceOfProduct) {case "high": min = 50; break; case "low": min = 70; break;
  //      };
  //    case "low":
  //      switch (priceOfProduct) {case "high": min =10, max=20; break; case "low": min = 50, max = 80; break;}
  //  }

  const numBuyers = Math.floor((Math.random() * (max - min) + min)) ;

  // salesCount = current ROUND score
  const salesCount = numBuyers * (priceOfProduct - productionCost);
  // finalscore = previous round score + current round score - warrant price
  let finalScore = currentScore + salesCount - warrantPrice;


  function handleSubmit() {
    console.log('Moving on from results round');
    player.stage.set("submit", true);
    player.set("score", finalScore);
  }
  // if warrantChoice is no, then the player cannot challenge warrant
  if (warrantChoice === 'No') {
    console.log('getting there', warrantChoice);
    finalScore = currentScore + salesCount;
    return (
        <div className="mt-3 sm:mt-5 p-20">
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            Sales
          </h1>
          <div className="text-lg mt-2 mb-6">
            {/* <p className="text-sm text-gray-500"> */}
            <p>
              You chose to produce a <b>{productionQuality}</b> quality product.
            </p>
            <p>
              You chose to advertise it as a <b>{advertisementQuality}</b> quality product. You sold it at a price of <b>${priceOfProduct}</b>.
            <br /> <br />
            </p>

            <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

            <p>
              It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
            </p>    
            <p> 
              You earned ${priceOfProduct - productionCost} per product x {numBuyers} units sold = {salesCount} points in sales.
            </p><br/>
            <br />
            <p>You did<strong> not</strong> choose to warrant this product.</p>
            <p> Your score for this round is: {salesCount} </p>
            <p> Your total score is: {salesCount + currentScore} </p><br/>
            <p> 
              Click to proceed to the next round to sell products in this marketplace.
            </p>
          </div>
          <Button handleClick={handleSubmit} primary>
            I'm done!
          </Button>
        </div>
      );
  } else if (warrantChoice === 'Yes' && playerWarrantChallenge === true) {
    // if the qualities are equal
    if (productionQuality === advertisementQuality) {
      // receive warrant money + 20% of sales
      finalScore = currentScore + salesCount + warrantPrice + (salesCount * 0.2);
      return (
        <div className="mt-3 sm:mt-5 p-20">
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            Sales
          </h1>
          <div className="text-lg mt-2 mb-6">
            {/* <p className="text-sm text-gray-500"> */}
            <p>
              You chose to produce a <b>{productionQuality}</b> quality product.
            </p>
            <p>
              You chose to advertise it as a <b>{advertisementQuality}</b> quality product. You sold it at a price of <b>${priceOfProduct}</b>.
            <br /> <br />
            </p>

            <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

            <p>
              It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
            </p>
            <p> 
              You earned ${priceOfProduct - productionCost} per product x {numBuyers} units sold = {salesCount} points in sales.
            </p><br/>
            <p><strong>Since you correctly advertised your product's quality, you will receive your warrant money along with a bonus.</strong></p>
            <br />
            
            <p> Your score for this round is: {salesCount} </p>
            <p> Your total score is: {salesCount + currentScore} </p><br/>
            <p> 
              Click to proceed to the next round to sell products in this marketplace.
            </p>
          </div>
          <Button handleClick={handleSubmit} primary>
            I'm done!
          </Button>
        </div>
      );
      // if the prod quality is higher than advertisement quality, then the producer only receives the warrant money 
    } else if (productionQuality === 'high' && advertisementQuality === 'low') {
        finalScore = currentScore + salesCount + warrantPrice;
        return (
          <div className="mt-3 sm:mt-5 p-20">
            <h1 className="text-lg leading-6 font-medium text-gray-900">
              Sales
            </h1>
            <div className="text-lg mt-2 mb-6">
              {/* <p className="text-sm text-gray-500"> */}
              <p>
                You chose to produce a <b>{productionQuality}</b> quality product.
              </p>
              <p>
                You chose to advertise it as a <b>{advertisementQuality}</b> quality product. You sold it at a price of <b>${priceOfProduct}</b>.
              <br /> <br />
              </p>

              <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

              <p>
                It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
              </p>
              <p> 
                You earned ${priceOfProduct - productionCost} per product x {numBuyers} units sold = {salesCount} points in sales.
              </p><br/>
              <p><strong>Since you incorrectly advertised your product's quality as low, but your product quality was high, you will only receive your warrant money.</strong></p>
            <br />
              <p> Your score for this round is: {salesCount} </p>
              <p> Your total score is: {finalScore} </p><br/>
              <p> 
                Click to proceed to the next round to sell products in this marketplace.
              </p>
            </div>
            <Button handleClick={handleSubmit} primary>
              I'm done!
            </Button>
          </div>
        );
      // if the prod quality is lower than advertisement quality, you lose 50% of round score
    } else if (productionQuality === 'low' && advertisementQuality === 'high') {
        finalScore = currentScore + (salesCount - warrantPrice) * 0.5;
        return (
          <div className="mt-3 sm:mt-5 p-20">
            <h1 className="text-lg leading-6 font-medium text-gray-900">
              Sales
            </h1>
            <div className="text-lg mt-2 mb-6">
              {/* <p className="text-sm text-gray-500"> */}
              <p>
                You chose to produce a <b>{productionQuality}</b> quality product.
              </p>
              <p>
                You chose to advertise it as a <b>{advertisementQuality}</b> quality product. You sold it at a price of <b>${priceOfProduct}</b>.
              <br /> <br />
              </p>

              <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

              <p>
                It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
              </p>
              <p> 
                You earned ${priceOfProduct - productionCost} per product x {numBuyers} units sold = {salesCount} points in sales.
              </p><br/>

              <p><strong>Since you advertised your product's quality as high but your product quality is low, you will lose 50% of your round score.</strong></p>


            <br />
              <p> Your score for this round is: {salesCount} </p>
              <p> Your total score is: {finalScore} </p><br/>
              <p> 
                Click to proceed to the next round to sell products in this marketplace.
              </p>
            </div>
            <Button handleClick={handleSubmit} primary>
              I'm done!
            </Button>
          </div>
        );
      }
    // if the player does not challenge the warrant, then the producer just gets back the warrant money
  } else if (warrantChoice === 'Yes' && playerWarrantChallenge === false) {
    finalScore = currentScore + salesCount + warrantPrice;
      return (
        <div className="mt-3 sm:mt-5 p-20">
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            Sales
          </h1>
          <div className="text-lg mt-2 mb-6">
            {/* <p className="text-sm text-gray-500"> */}
            <p>
              You chose to produce a <b>{productionQuality}</b> quality product.
            </p>
            <p>
              You chose to advertise it as a <b>{advertisementQuality}</b> quality product. You sold it at a price of <b>${priceOfProduct}</b>.
            <br /> <br />
            </p>

            <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

            <p>
              It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
            </p>
            <p> 
              You earned ${priceOfProduct - productionCost} per product x {numBuyers} units sold = {salesCount} points in sales.
            </p><br/>
            <p><strong>Since your warrant was not challenged, you will receive the warrant money back.</strong></p>
            <p> Your score for this round is: {salesCount} </p>
            <p> Your total score is: {finalScore} </p><br/>
            <p> 
              Click to proceed to the next round to sell products in this marketplace.
            </p>
          </div>
          <Button handleClick={handleSubmit} primary>
            I'm done!
          </Button>
        </div>
      );
  } else {
    // case where warrantChoice is no
      finalScore = currentScore + salesCount;
      console.log('reached case', finalScore);
      return (
        <div className="mt-3 sm:mt-5 p-20">
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            Sales
          </h1>
          <div className="text-lg mt-2 mb-6">
            {/* <p className="text-sm text-gray-500"> */}
            <p>
              You chose to produce a <b>{productionQuality}</b> quality product.
            </p>
            <p>
              You chose to advertise it as a <b>{advertisementQuality}</b> quality product. You sold it at a price of <b>${priceOfProduct}</b>.
            <br /> <br />
            </p>

            <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

            <p>
              It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
            </p>
            <p> 
              You earned ${priceOfProduct - productionCost} per product x {numBuyers} units sold = {salesCount} points in sales.
            </p><br/>
            <p> Your score for this round is: {salesCount} </p>
            <p> Your total score is: {finalScore} </p><br/>
            <p> 
              Click to proceed to the next round to sell products in this marketplace.
            </p>
          </div>
          <Button handleClick={handleSubmit} primary>
            I'm done!
          </Button>
        </div>
      );
    }
  }