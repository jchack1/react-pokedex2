import React, {useState, useEffect} from "react";
import styled from "styled-components";
import "../App.css";

const Container = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  background: white;
  flex-direction: column;
  border: 1px solid #ccc;
  box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
  margin: 20px;

  display: ${(props) => (props.show ? "flex" : "none")};

  transition: all 0.3s ease-out;

  &:hover {
    box-shadow: 0px 7px 32px 7px rgba(0, 0, 0, 0.9);
  }
  p {
    margin: 5px 15px;
    text-align: center;
  }

  @media (max-width: 1060px) {
    width: 250px;
    height: 250px;

    h1 {
      margin: 5px;
    }
  }

  @media (max-width: 910px) {
    width: 200px;
    height: 200px;
  }
  @media (max-width: 760px) {
    width: 230px;
    height: 230px;
  }
  @media (max-width: 580px) {
    width: 175px;
    height: 175px;

    margin: 10px;

    h1 {
      font-size: 1.3rem;
      margin: 0;
    }
    p {
      font-size: 0.7rem;
    }
  }
  @media (max-width: 425px) {
    width: 130px;
    height: 130px;

    margin: 5px;

    h1 {
      font-size: 1.1rem;
    }
    p {
      font-size: 0.6rem;
    }
  }
  @media (max-width: 320px) {
    width: 175px;
    height: 175px;

    margin: 10px;

    h1 {
      font-size: 1.2rem;
    }
    p {
      font-size: 0.7rem;
    }
  }
`;

const Sprite = styled.img`
  width: 150px;
  @media (max-width: 1060px) {
    width: 100px;
  }
  @media (max-width: 580px) {
    width: 85px;
  }
  @media (max-width: 425px) {
    width: 70px;
  }
  @media (max-width: 300px) {
    width: 100px;
  }
`;

//return abilities markup based on how many abilities the pokemon has
const Abilities = ({abilities}) => {
  return abilities.length > 1 ? (
    <p>
      <strong>Abilities: </strong>
      {abilities.map((ability, i) => {
        if (i === abilities.length - 1) {
          return <span key={`ability-${i}`}>{ability}</span>;
        } else {
          return <span key={`ability-${i}`}>{ability}, </span>;
        }
      })}
    </p>
  ) : abilities.length === 1 ? (
    <p>
      <strong>Ability: </strong> {abilities[0]}
    </p>
  ) : (
    <p>
      <strong>Abilities: </strong>none
    </p>
  );
};

//return types markup based on how many types this pokemon has
const Types = ({types}) => {
  return types.length > 1 ? (
    <p>
      <strong>Types: </strong>
      {types.map((type, i) => {
        if (i === types.length - 1) {
          return <span key={`type-${i}`}>{type}</span>;
        } else {
          return <span key={`type-${i}`}>{type}, </span>;
        }
      })}
    </p>
  ) : types.length === 1 ? (
    <p>
      <strong>Type:</strong> {types[0]}
    </p>
  ) : (
    <p>
      <strong>Types:</strong> none
    </p>
  );
};

//get data from filter to know if we should show the card
const Card = ({
  pokemon,
  filteredTypes,
  typesAndOr,
  filteredAbilities,
  abilitiesAndOr,
}) => {
  const [isFlipped, updateIsFlipped] = useState(false);

  const [abilities, updateAbilities] = useState(pokemon.abilities);
  const [types, updateTypes] = useState(pokemon.types);
  const [showTypes, updateShowTypes] = useState(true);
  const [showAbilities, updateShowAbilities] = useState(true);
  const [showCard, updateShowCard] = useState(true);

  const showCardTypes = (filteredTypes, typesAndOr) => {
    //is our pokemon the same type that is selected?
    let show = true;

    if (filteredTypes.length === 0) {
      //if none selected
      updateShowTypes(show);
      return;
    }
    if (typesAndOr === "and") {
      show = filteredTypes.every((t) => types.includes(t));
    }
    if (typesAndOr === "or") {
      show = types.some((t) => filteredTypes.includes(t));
    }

    updateShowTypes(show);
  };

  const showCardAbilities = (filteredAbilities, abilitiesAndOr) => {
    //is our pokemon the same ability that is selected?
    let show = true;

    if (filteredAbilities.length === 0) {
      //if none selected
      updateShowAbilities(show);
      return;
    }
    if (abilitiesAndOr === "and") {
      show = filteredAbilities.every((a) => abilities.includes(a));
    }
    if (abilitiesAndOr === "or") {
      show = abilities.some((a) => filteredAbilities.includes(a));
    }

    updateShowAbilities(show);
  };

  //check both types and abilities, if both are true then show the card
  const showPokemonCard = (showTypes, showAbilities) => {
    if (showTypes && showAbilities) {
      updateShowCard(true);
    } else {
      updateShowCard(false);
    }
  };

  useEffect(() => {
    showCardTypes(filteredTypes, typesAndOr);
    showCardAbilities(filteredAbilities, abilitiesAndOr);
  }, [filteredTypes, typesAndOr, filteredAbilities, abilitiesAndOr]);

  useEffect(() => {
    showPokemonCard(showTypes, showAbilities);
  }, [showTypes, showAbilities]);

  return isFlipped ? (
    <Container
      onClick={() => updateIsFlipped(!isFlipped)}
      key={pokemon.pokemon}
      show={showCard}
    >
      <p>
        <strong>Height: </strong>
        {pokemon.height}
      </p>
      <p>
        <strong>Weight:</strong> {pokemon.weight}
      </p>
      <Types types={pokemon.types} />
      <Abilities abilities={pokemon.abilities} />
    </Container>
  ) : (
    <Container
      onClick={() => updateIsFlipped(!isFlipped)}
      key={pokemon.pokemon}
      show={showCard}
    >
      <Sprite src={pokemon.sprite} alt="pokemon sprite" />
      <h1>{pokemon.pokemon}</h1>
      <p>#{pokemon.idNumber}</p>
    </Container>
  );
};
export default Card;
