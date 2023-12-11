import {
    Slider,
    usePlayer,
    usePlayers,
    useStage,
  } from "@empirica/core/player/classic/react";
  import React, {useState} from "react";
  import { Avatar } from "../components/Avatar";
  import { Button } from "../components/Button";
  import "@empirica/core/player/classic/react";
  
  export function Advertisement() {
    const player = usePlayer();
    const players = usePlayers();
    const stage = useStage();
  
    function handleChange() {
      console.log("something happened");
    }
  
    // function handleSubmit(e) {/*Here we need to pass what kind of advertisement option the player chose*/
    //   player.set("adQuality", e.target.adQuality)
    //   console.log("saved quality to player object")
    //   player.stage.set("submit", true);
    // }
    function handleSubmit(e, quality) {
      player.set("adQuality", quality);
      console.log("Saved quality to player object: ", quality, " ", player.id);
      player.stage.set("submit", true);
    }
    
    let product = <ProductLayout />;
  
    const isResultStage = stage.get("name") === "result";
  
    if (players.length > 1) {
      product = (
        <div className="grid grid-cols-2 items-center">
          {product}
          <div>
            {isResultStage ? (
              <>
                <div className="text-gray-500 text-2xl">You</div>
                <div className="border-b-3 border-blue-500/50 pb-2 mb-8">
                  {PlayerScore(player, () => {}, isResultStage)}
                </div>
              </>
            ) : null}
            {players
              .filter((p) => p.id !== player.id)
              .map((p) => PlayerScore(p, handleChange, isResultStage))}
          </div>
        </div>
      );
    } else if (players.length == 1 && isResultStage) {
      product = (
        <div className="grid grid-cols-2 items-center">
          {product}
          <div>
            {isResultStage ? PlayerScore(player, () => {}, isResultStage) : null}
          </div>
        </div>
      );
    }
    return (
      <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
        {}
        <br/>
        <h1><b>You are a producer of toothpaste.</b> </h1>
        <p>You will now decide what to produce, how to advertise it and the price.</p>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <h1><b>You are a producer of toothpaste</b></h1>
          <h1><b>Choose what to produce</b></h1>
          <div className="flex justify-center space-x-4"> {/* This flex container will lay out its children (products) in a row */}
          <ProductionAlternative title="Standard Toothpaste (low quality)" cost="5" quality="low" imageUrl={""} on_button_click={(e) => handleSubmit(e, "low")}/>
          <ProductionAlternative title="Amazing Toothpaste (high quality)" cost="9" quality="high" on_button_click={(e) => handleSubmit(e, "high")}/> {/*Here we need to pass what kind of advertisement option the player chose*/ }
        </div>
        <br/><br/><br/><br/><br/><br/><br/>
          <h1><b>Choose how you want to advertise it</b></h1>
          <p><strong>Note: </strong>You have the ability to make any kind of advertisement<br/> about your product in order to maximize your sales.</p>
          <div className="flex justify-center space-x-4"> {/* This flex container will lay out its children (products) in a row */}
          <AdvertisementAlternative title="Standard Toothpaste (low quality)" price="10" quality="low" on_button_click={(e) => handleSubmit(e, "low")}/>
          <AdvertisementAlternative title="Amazing Toothpaste (high quality)" price="15" quality="high" on_button_click={(e) => handleSubmit(e, "high")}/> {/*Here we need to pass what kind of advertisement option the player chose*/ }
        </div>
        <br/><br/><br/><br/><br/>
          <h1><b>Choose the price for your product</b></h1>

          <p> A typical price for <b>low </b> quality toothpaste is : $10 </p>
          <p> A typical price for <b>high</b> quality toothpaste is : $15 </p>
          <p><strong>Note: </strong>You have the ability to set any kind of price<br/> for your product in order to maximize your sales.</p>
          <div className="flex justify-center space-x-4"> 
          <PriceButton text={'$10'}></PriceButton>
          <PriceButton text={'$15'}></PriceButton>
          </div>
          <br/><br/>
            <Button> Go to market (next round) </Button>
            <br/>
      </div>
    );
  }
  
  function ProductionAlternative({ title, imageUrl, cost, quality, on_button_click }) {
    return (
      <div className="h-50 w-50 pb-6">
        <div
          className="h-full w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://media.istockphoto.com/id/638349734/photo/ttoothpaste-containers-on-white-isolated-background.jpg?s=612x612&w=0&k=20&c=eF1XyMlRaQLI9ETehA3_7En5_3D41GX7FKb8cIWeP8k=)",
          }}
          alt={title}
        />
        <div className="flex">
          <h2>{title}. <br/>
          {cost} points per unit sold</h2>
        </div>
        <Button handleClick={on_button_click} adQuality={quality} primary>
          💸 Produce this quality for ${cost} per unit
            </Button>
      </div>
    );
  }
  
  function AdvertisementAlternative({ title, imageUrl, price, quality, on_button_click }) {
    return (
      <div className="h-50 w-50 pb-6">
        <div
          className="h-full w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://media.istockphoto.com/id/638349734/photo/ttoothpaste-containers-on-white-isolated-background.jpg?s=612x612&w=0&k=20&c=eF1XyMlRaQLI9ETehA3_7En5_3D41GX7FKb8cIWeP8k=)",
          }}
          alt={title}
        />
        <div class="flex">
          <h2>{title}. <br/> </h2>
          {/*{price} points per unit sold</h2>*/}
        </div>
        <Button handleClick={on_button_click} adQuality={quality} primary>
          💸 Advertise as {quality} quality
            </Button>
      </div>
    );
  }

  function PriceButton({text, price}){
    return(
      <Button >
          🏷️ Sell my product for {text} {price}
            </Button>
    )
  }

  function PlayerScore(player, onChange, isResultStage) {
    return (
      <div key={player.id} className="py-4">
        <div className="flex items-center space-x-6">
          <div className="h-12 w-12 shrink-0">
            <Avatar player={player} />
          </div>

          {isResultStage ? (
            <div className="flex flex-col items-center space-y-0.5">
              <div className="text-2xl font-semibold leading-none font-mono">
                {player.round.get("score") || 0}
              </div>
              <h1 className="text-xs font-semibold uppercase tracking-wider leading-none text-gray-400">
                Score
              </h1>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
