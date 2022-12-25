import Block from "../../utils/Block";
import template from "./input.hbs";

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  disabled?: string;
  events?: {
    blur?: (e: Event) => void;
    focus?: (e: Event) => void;
    keyup?: (e: Event) => void | undefined;
  };
}

export class Input extends Block<InputProps> {
  
  public getName() {
    return (this.element as HTMLInputElement).name;
  }
  public setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value);
  }
  public setEditable(editable: boolean) {
    if(editable) {
      return (this.element as HTMLInputElement).removeAttribute("disabled");
    } 
    return (this.element as HTMLInputElement).setAttribute("disabled", "disabled");
  }
  public getValue() {
    return (this.element as HTMLInputElement).value;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
