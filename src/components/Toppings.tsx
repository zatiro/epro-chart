import * as React from 'react';
import { useState } from 'react';
import { Card, Button} from 'react-bootstrap';
import { BsBoxArrowDown, BsBoxArrowUp } from 'react-icons/bs'

import styles from '../styles/components/Toppings.module.css';
import eproJson from '../epro.json';

const eproJsonOptions = [eproJson];

const toppingOptions = [
  {
    name: "Pepperoni",
    id: "pepperoni-id",
    subOptions: [
      {
        name: "Spicy",
        id: "spicy-id",
        subOptions: []
      },
      {
        name: "Regular",
        id: "regular-id",
        subOptions: []
      }
    ]
  },
  {
    name: "Chicken",
    id: "chicken-id",
    subOptions: [
      {
        name: "Wings",
        id: 'wings-id',
        subOptions: [],
      },
      {
        name: "Buffalo",
        id: "buffalo-id",
        subOptions: [
          {
            name: "Mild",
            id: 'mild-id',
            subOptions: [],
          },
          {
            name: "Hot",
            id: 'hot-id',
            subOptions: [
              {
                name: 'Jalapeño',
                id: 'jalapeno-id',
                subOptions: []
              },
              {
                name: 'Cayenne',
                id: 'cayenne-id',
                subOptions: []
              }
            ],
          },
        ]
      },
      {
        name: "BBQ",
        id: 'bbq-id',
        subOptions: [
          {
            name: 'Cayenne',
            id: 'cayenne-id',
            subOptions: []
          }
        ],
      }
    ]
  },
]

// Root component -> Manages all app state
export class Toppings extends React.Component {   

  state = {
    selectedOptions: {}
  }

  render() {
    return (
      <div className={styles.orgTree}>
        <h1>Epro In Cascade</h1>
        <h4><i>Created by: <b>TAC</b></i></h4>
        <br/>
        <OptionsList 
          options={eproJsonOptions} 
          onChange={(selectedOptions) => this.setState({selectedOptions})}
          selectedOptions={this.state.selectedOptions} 
        />
      </div>
    )
  }
  
}

// Recursive component
const OptionsList = ({ options, selectedOptions, onChange }) => {
 
  const handleCheckboxClicked = (selectedOptionId) => {
    // is currently selected
    if(selectedOptions[selectedOptionId]){
      // remove selected key from options list
      delete selectedOptions[selectedOptionId]; 
    } else { // is not currently selected
      // Add selected key to optionsList
      selectedOptions[selectedOptionId] = {} 
    }
    // call onChange function given by parent
    onChange(selectedOptions) 
  }
  
  const handleSubOptionsListChange = (optionId, subSelections) => {
    // add sub selections to current optionId
    selectedOptions[optionId] = subSelections;
    // call onChange function given by parent
    onChange(selectedOptions);
  }

  const getJustInfosFrom = (option) => {
    // Remove a passagem de todas as sob-opções que existirem em determinado node
    // para passar apenas informações do node
    let {subOptions, ...infos} = option;
    
    // Criação de nova informação
    infos['hasChildren'] = (subOptions.length > 0);
    
    return infos;
  }
  
  return (
    <ul>
      {options.map(option => (
        <>
          <li>
            <CardNode 
              selected={selectedOptions[option.id]} 
              infos={ getJustInfosFrom(option) } 
              onChange={() => {handleCheckboxClicked(option.id)}}
            />
            {/* Base Case */}
            {(option.subOptions.length > 0 && selectedOptions[option.id]) &&
              <OptionsList
                options={option.subOptions}
                selectedOptions={selectedOptions[option.id]} 
                onChange={(subSelections) => handleSubOptionsListChange(option.id, subSelections)}
              />
            }
          </li>
        </>
      ))}
    </ul>
  )
}

// Dumb checkbox component, completly controlled by parent
const CardNode = ({ selected, infos, onChange }) => {
  const [ isChecked, setIsCheched ] = useState(selected);

  function onCheckboxClicked () {
    setIsCheched(!isChecked);
  }

  return (
    <div className={styles.node}>
      <Card className={styles.card}>
      <Card.Img variant="top" src={infos.img} className={styles.cardImg} />
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>{infos.name}</Card.Title>
          
          <table className={styles.cardTable}>
            <tr>
              <td>PN</td>
              <td>{infos.pn}</td>
            </tr>
            <tr>
              <td>Revisão</td>
              <td>{infos.revision}</td>
            </tr>
            <tr>
              <td>Qtd.</td>
              <td>{infos.quantity}</td>
            </tr>
          </table>

          { infos.hasChildren && (
            <div className={styles.cardCheckboxContainer}>
              <Button 
                variant="light"
                size="sm"
                block
                onClick={() => {
                  onChange(!selected);
                }}
              >{ selected ? <BsBoxArrowUp size="1.5rem" color="red" /> : <BsBoxArrowDown size="1.5rem" color="green" /> }</Button>
            </div>
          ) }
          
        </Card.Body>
      </Card>
    </div>
  )
}