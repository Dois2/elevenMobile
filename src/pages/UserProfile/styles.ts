import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  background-color: #34bbe1;
  height: 35%;

  /* justify-content: center; */
  align-items: center;
`;

export const BodyContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
export const FormContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 25px;
`;

export const UserImage = styled.Image`
  border-radius: 100px;
  position: relative;
  margin-top: -100px;
  width: 150px;
  height: 150px;
`;

export const Header = styled.Text`
  margin-top: 25px;
  color: #fff;
  font-size: 33px;
  font-weight: bold;
  font-family: 'Times New Roman';
`;

export const UserName = styled.Text`
  margin-top: 25px;
  color: #000;
  font-size: 33px;
  font-weight: bold;
  font-family: 'Times New Roman';
`;
