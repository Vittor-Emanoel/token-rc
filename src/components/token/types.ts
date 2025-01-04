export interface Token {
  id: string;
  value: string;
}

export interface TokenStyles {
  containerClassName?: string;
  tagClassName?: string;
  inputEditClassName?: string;
  inputClassName?: string;
}

export interface InputTokenProps {
  onChangeValue?: (tokens: Token[]) => void;
  tokens: Token[];
  onInputChange?: (value: string) => void;
  styles?: TokenStyles;
}
