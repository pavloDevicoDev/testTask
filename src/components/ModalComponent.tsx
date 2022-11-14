import React from 'react'
import styled from 'styled-components/native'
import { Button } from './buttons/Button'
import { Modal } from "react-native";
import { BigTitle } from './typography/BigTitle'
import { BodyLarge } from './typography/BodyLarge'

type Props = {
  questionText: string
  subQuestionText?: string
  isModalOpen: boolean
  onClose: () => void
  onAccept: () => void
}

export default function ModalComponent({
  questionText,
  subQuestionText,
  isModalOpen,
  onClose,
  onAccept,
}: Props) {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={onClose}
    >
      <Wrapper>
        <ModalBlock>
          <TextBlock>
            <BigTitle>{questionText}</BigTitle>
            {subQuestionText ? <BodyLarge>{subQuestionText}</BodyLarge> : null}
          </TextBlock>
          <Row>
            <BlueStyledButton title='Yes' onPress={onAccept} />
            <StyledButton title='No' onPress={onClose} />
          </Row>
        </ModalBlock>
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.View`
justify-content: center;
align-items: center;
background-color: ${({ theme }) => theme.colors.black};
width:80%;
height: 250px;
margin: auto;
border-radius:8px;
`

const TextBlock = styled.View`
`

const Row = styled.View`
flex-direction: row;
`

const ModalBlock = styled.View`
flex:1;
justify-content: space-between;
width: 100%;
padding: 32px 24px 18px;
`


const BlueStyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.oceanBlue};
  flex:1;
  margin-right:8px;
`


const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.darkGray};
  flex:1;
`