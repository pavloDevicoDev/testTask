import { memo } from 'react'
import styled from 'styled-components/native'
import { InputError } from './InputError'
import { Body } from './typography/Body'
import Animated, {
  ZoomOutRotate,
  ZoomInRotate,
  Layout,
} from 'react-native-reanimated'

export const SecretPhrase = memo(
  ({
    data: { phrases, error },
  }: {
    data: { phrases: string[]; error?: string }
  }) => {
    return (
      <Wrapper>
        {error ? <InputError>{error}</InputError> : null}
        <Container>
          {phrases.map((word: string, idx: number) => (
            <WordBlock
              key={idx}
              entering={ZoomInRotate}
              exiting={ZoomOutRotate}
              layout={Layout.springify()}
            >
              <StyledBody numberOfLines={1}>{`${idx + 1}. ${word}`}</StyledBody>
            </WordBlock>
          ))}
        </Container>
      </Wrapper>
    )
  }
)

const StyledBody = styled(Body)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 8px;
`

const WordBlock = styled(Animated.View)`
  height: 40px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 8px;
  margin: 0 5px 5px;
  overflow: hidden;
  flex-basis: auto;
`

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 78px;
  width: 100%;
  padding: 16px;
  padding-bottom: 0;
  flex-wrap: wrap;
`
const Wrapper = styled.View`
  flex: 1;
  align-items: center;
`

const ErrorBlock = styled.View`
  height: 30px;
`
