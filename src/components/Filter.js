import React, {useState, useEffect} from "react";
import Select from "react-select";
import styled from "styled-components";

const AndOrButton = styled.button`
  width: 100px;
  height: 30px;
  padding: 8px 10px;

  background: ${(props) => (props.on ? "yellow" : "black")};
  color: ${(props) => (props.on ? "black" : "yellow")};
  border: ${(props) => (props.on ? "2px solid black" : "2px solid yellow")};

  font-family: Arial, sans-serif;

  transition: all 0.3s ease-out;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
`;
const SelectContainer = styled.div`
  display: flex;
`;

const Filter = ({
  typeOptions,
  abilityOptions,
  selectedAbilities,
  selectedTypes,
  updateSelectedTypes,
  updateSelectedAbilities,
  updateTypesAndOr,
  updateAbilitiesAndOr,
  typesAndOr,
  abilitiesAndOr,
}) => {
  const [allTypeOptions, updateAllTypeOptions] = useState([]);
  const [allAbilityOptions, updateAllAbilityOptions] = useState([]);

  useEffect(() => {
    //create type options for select
    const types = typeOptions.map((type) => {
      return {
        value: type,
        label: type,
      };
    });
    updateAllTypeOptions(types);

    //create ability options
    const abilities = abilityOptions.map((ability) => {
      return {
        value: ability,
        label: ability,
      };
    });
    updateAllAbilityOptions(abilities);
  }, [typeOptions, abilityOptions]);

  const formatSelectedAbilities = (x) => {
    const array = x.map((y) => {
      return y.value;
    });
    updateSelectedAbilities(array);
  };

  const formatSelectedTypes = (x) => {
    const array = x.map((y) => {
      return y.value;
    });
    updateSelectedTypes(array);
  };

  console.log("abilities andor filter: " + JSON.stringify(abilitiesAndOr));
  return (
    <FilterContainer>
      <SelectContainer>
        <Select
          options={allTypeOptions}
          onChange={(x) => formatSelectedTypes(x)}
          isMulti
        />
        {typesAndOr === "or" ? (
          <AndOrButton onClick={() => updateTypesAndOr("and")}>OR</AndOrButton>
        ) : (
          <AndOrButton onClick={() => updateTypesAndOr("or")}>AND</AndOrButton>
        )}
      </SelectContainer>
      <SelectContainer>
        <Select
          options={allAbilityOptions}
          onChange={(x) => {
            formatSelectedAbilities(x);
          }}
          isMulti
        />
        {abilitiesAndOr === "or" ? (
          <AndOrButton onClick={() => updateAbilitiesAndOr("and")}>
            OR
          </AndOrButton>
        ) : (
          <AndOrButton onClick={() => updateAbilitiesAndOr("or")}>
            AND
          </AndOrButton>
        )}
      </SelectContainer>
    </FilterContainer>
  );
};

export default Filter;
