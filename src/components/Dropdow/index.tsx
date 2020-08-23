import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';
import {Container, PickerLine, Icon} from './styles';
import api from '../../services/api';

interface DropDownnProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueRefence {
  value: string;
}

interface InputRef {
  focus(): void;
}

interface ProductsData {
  products: Product[];
}
interface Product {
  id: number;
  name: string;
}

const Dropdown: React.RefForwardingComponent<InputRef, DropDownnProps> = (
  {name, icon, ...rest},
  ref,
) => {
  const {fieldName, defaultValue = '', error, registerField} = useField(name);
  const inputValueRef = useRef<InputValueRefence>({value: ''});
  const inputElementRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [pickerValue, setPickerValue] = useState(0);

  const [products, setProducts] = useState([] as Product[]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  const loadProducts = useCallback(async () => {
    try {
      const loadedProducts = await api.get<ProductsData>('products');

      setProducts(loadedProducts.data.products);
    } catch (error) {}
  }, []);

  useEffect(() => {
    // Passamos o nome do componente, mais a referência e o path de
    // dentro da referência que vamos buscar o valor.
    // Para integrar com todas as funcionalidades do unform, podemos passar
    // mais duas propriedades para o registerField, sendo elas:
    //
    // setValue():    Vai possibilitar alterar o componente visual do Input com
    //                uma função do Form.current.setValue().
    //                Nosso Ref não altera visualmente o input, somente armazena
    //                seu valor.
    // clearValue():  Vai definir quando o Form for "Limpar" o input
    //                qual o componente visual que vamos passar para ele.
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(reff: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });

    loadProducts();
  }, [fieldName, loadProducts, registerField]);

  return (
    <Container isFocus={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#34bbe1' : '#666360'}
      />
      <PickerLine
        selectedValue={pickerValue}
        ref={inputElementRef}
        keyboardAppearance="dark"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        placeholderTextColor="#666360"
        onValueChange={(value) => {
          setPickerValue(Number(value));
          inputValueRef.current.value = String(value);
        }}
        {...rest}>
        <PickerLine.Item label="Escolha um produto" value={0} />
        {products.map((product) => {
          return (
            <PickerLine.Item
              key={product.name}
              label={product.name}
              value={product.id}
            />
          );
        })}
      </PickerLine>
    </Container>
  );
};

export default forwardRef(Dropdown);
