import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === 'all'){
      fetch('/api/pets')
      .then(resp => resp.json())
      .then(json => this.updatePets(json))
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then(json => this.updatePets(json))
    }
  }

  updatePets = (json) => {
    this.setState({
      pets: json
    })
  }

  onAdoptPet = (id) => {
    let adoptedPet = this.state.pets.find(pet => pet.id === id)
    let idx = this.state.pets.findIndex(pet => pet === adoptedPet)
    adoptedPet.isAdopted = true
    this.setState(prevState => {
      return {pets: [...prevState.pets.slice(0, idx), adoptedPet, ...prevState.pets.slice(idx + 1)]}
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
