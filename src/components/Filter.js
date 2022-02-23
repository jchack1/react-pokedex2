import React, {useState, useEffect} from "react";
import Select from "react-select";
import styled from "styled-components";
import Toggle from "./Toggle";

const FilterContainer = styled.div`
  display: flex;
  margin: 10px 30px 50px 30px;
`;
const SelectContainer = styled.div`
  display: flex;
  width: 80vw;
  max-width: 600px;
  flex-direction: column;
`;

const LabelAndToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    color: white;
    font-weight: 600;
    margin-right: 10px;
  }
`;

const Filter = ({
  typeOptions,
  abilityOptions,
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
    //create type options for select - needs value and label format
    const types = typeOptions.map((type) => {
      return {
        value: type,
        label: type,
      };
    });
    updateAllTypeOptions(types);

    //create ability options for select - needs value and label format
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

  return (
    <FilterContainer>
      <SelectContainer>
        <LabelAndToggleContainer>
          <p>Filter types</p>
          <Toggle
            active={typesAndOr}
            onClick={() => {
              if (typesAndOr === "and") {
                updateTypesAndOr("or");
              }
              if (typesAndOr === "or") {
                updateTypesAndOr("and");
              }
            }}
          />
        </LabelAndToggleContainer>

        <Select
          options={allTypeOptions}
          onChange={(x) => formatSelectedTypes(x)}
          isMulti
          placeholder="Types..."
        />
        <LabelAndToggleContainer style={{marginTop: "20px"}}>
          <p>Filter abilities</p>
          <Toggle
            active={abilitiesAndOr}
            onClick={() => {
              if (abilitiesAndOr === "and") {
                updateAbilitiesAndOr("or");
              }
              if (abilitiesAndOr === "or") {
                updateAbilitiesAndOr("and");
              }
            }}
          />
        </LabelAndToggleContainer>
        <Select
          options={allAbilityOptions}
          onChange={(x) => {
            formatSelectedAbilities(x);
          }}
          isMulti
          placeholder="Abilities..."
        />
      </SelectContainer>
    </FilterContainer>
  );
};

export default Filter;
