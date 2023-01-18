import React, { useState } from 'react'
import styled from 'styled-components'

import { categoryOptions, difficultiesOptions, regionOptions } from '../options'

import { Categories } from '../enums/Categories'
import { Difficulty } from '../enums/Difficulty'
import { Region } from '../enums/Region'
import { GameConfig } from '../interfaces/GameConfig'

interface Props {
  onSubmit: (gameConfig: GameConfig) => any
}

export default function IntroForm({ onSubmit }: Props) {
  const [category, setCategory] = useState<Categories>()
  const [difficulty, setDifficulty] = useState<string>(Difficulty.EASY)
  const [playerName, setPlayerName] = useState<string>('')
  const [region, setRegion] = useState<Region>(Region.SE)
  const [visible, setVisible] = useState<boolean>(true)

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value
    setPlayerName(enteredName)
  }

  return (
    <>
      <NameInput
        className="input"
        onChange={inputHandler}
        placeholder="Enter your name"
        type="text"
        value={playerName}
      />

      <Label>Select Difficulty</Label>
      <Select onChange={(e) => setDifficulty(e.target.value)}>
        {difficultiesOptions.map((options, index) => (
          <option value={options.id} key={index}>
            {options.value}
          </option>
        ))}
      </Select>
      <Label>Select Region</Label>
      <SelectOption onChange={(e) => setRegion(e.target.value as Region)}>
        {regionOptions.map((options, index) => (
          <option value={options.id} key={index}>
            {options.value}
          </option>
        ))}
      </SelectOption>

      {visible && (
        <CategoryButton
          onClick={() => {
            categoryOptions.sort(() => Math.random() - 0.5)
            setVisible(!visible)
          }}
        >
          Select Category
        </CategoryButton>
      )}

      {!visible && (
        <CategorySection>
          {categoryOptions.slice(7).map((options, index) => (
            <CategoryButton
              onClick={() => setCategory(options.id)}
              value={options.id}
              key={index}
            >
              {options.value}
            </CategoryButton>
          ))}
        </CategorySection>
      )}

      <StartButton
        disabled={!playerName || !category}
        onClick={() =>
          onSubmit({
            categories: category as Categories,
            playerName,
            difficulty: difficulty as Difficulty,
            region,
          })
        }
      >
        Start Quiz
      </StartButton>
    </>
  )
}

const CategoryButton = styled.button`
  background-color: #48afea;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
  font-size: larger;
  margin: 15px 10px 15px;
  padding: 15px;

  :focus,
  :hover {
    background-color: #fff;
  }
`

const CategorySection = styled.div`
  display: flex;
`

const Label = styled.label`
  font-size: larger;
`

const NameInput = styled.input`
  font-size: 20px;
  margin-bottom: 30px;
`

const Select = styled.select`
  cursor: pointer;
  font-size: 20px;
  margin: 15px;
`

const SelectOption = styled.select`
  cursor: pointer;
  font-size: 20px;
  margin: 15px;
`

const StartButton = styled.button`
  font-size: 25px;
  height: 40px;
  margin-top: 30px;
  width: 200px;
`
