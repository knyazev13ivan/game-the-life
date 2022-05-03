import { Clear } from "./Clear"
import { StockPresets } from "./StockPresets"

interface localStorageItem {
  [key: string]: string
}

export class Saves {
  presetsContainer: HTMLElement

  presets: Array<[string, Array<Array<0 | 1>>]>
  newPreset?: string
  modal: HTMLElement
  name: HTMLInputElement
  warning: HTMLElement
  okButton: HTMLButtonElement

  constructor() {
    this.getPresets = this.getPresets.bind(this)
    this.savePreset = this.savePreset.bind(this)
    this.ok = this.ok.bind(this)

    this.presets = this.getPresets()

    this.presetsContainer = document.querySelector('.game-presets-list')!
    this.modal = document.querySelector('.modal-to-save-preset-container')!
    this.name = document.querySelector('.modal-to-save-preset__name')!
    this.warning = document.querySelector('.modal-to-save-preset__warning')!
    this.okButton = document.querySelector('.modal-to-save-preset-control__ok')!
  }
  getPresets(): Array<[string, Array<Array<0 | 1>>]> {
    const colection: Array<[string, Array<Array<0 | 1>>]> = StockPresets.slice(0)

    for (let i = 0; i < localStorage.length; i++) {
      const key: string = localStorage.key(i)!;
      colection.push([key, JSON.parse(localStorage.getItem(key)!)])
    }

    return colection
  }
  renderPresets(presets: Array<[string, Array<Array<0 | 1>>]>): void {
    for (const preset of this.presets) {
      const item: HTMLLIElement = document.createElement('li')
      item.textContent = preset[0]
      item.classList.add('game-presets-list__item')

      this.presetsContainer.append(item)
    }
  }
  savePreset(name: string, matrix: Array<Array<0 | 1>>): void {
    this.newPreset = JSON.stringify(matrix)

    localStorage.setItem(name, this.newPreset)

    this.presets.push([name, matrix])
  }
  showModal(): void {
    this.modal.style.display = 'flex'
    this.warning.style.display = 'none';
  }
  ok(name: string, matrix: Array<Array<0 | 1>>): void {
    if (name && !localStorage.getItem(name)) {
      this.savePreset(name, matrix)

      const item: HTMLLIElement = document.createElement('li')
      item.textContent = name
      item.classList.add('game-presets-list__item')

      this.presetsContainer.append(item)

      this.modal.style.display = 'none'
    } else {
      this.warning.style.display = 'block';
    }

  }
  cancel(): void {
    this.modal.style.display = 'none'
  }
}