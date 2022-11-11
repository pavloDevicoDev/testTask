import React, { useState, useEffect, useCallback } from 'react'
import { BarCodeScanner as QRScanner } from 'expo-barcode-scanner'
import styled from 'styled-components/native'
import { Title } from './typography/Title'
import { Button } from './buttons/Button'
import { Body } from './typography/Body'
import { SecretPhrase } from './SecretPhrase'
import { getPhrases } from '../utils/getPhrases'
import { RotationBox } from './RotationBox'
import { BarCodeType } from '../types/types'

type Props = {
  barCodeValue: BarCodeType
  scanned: boolean
  setBarCodeValue: (prop: BarCodeType) => void
  setScanned: (prop: boolean) => void
  onChangeProps?: (prop: BarCodeType) => void
}

export default function BarCodeScanner({
  barCodeValue,
  setBarCodeValue,
  setScanned,
  scanned,
  onChangeProps,
}: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  const askForCameraPermission = useCallback(() => {
    ;(async () => {
      const { status } = await QRScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  useEffect(() => {
    askForCameraPermission()
  }, [])

  const handleBarCodeScanned = useCallback(({ data }: { data: string }) => {
    const newArray = getPhrases(data)
    setScanned(true)
    setBarCodeValue(newArray)
    onChangeProps?.(newArray)
  }, [])

  const handleScanAgain = useCallback(() => {
    setScanned(false)
    setBarCodeValue({ phrases: [], rawValue: '' })
    onChangeProps?.({ phrases: [], rawValue: '' })
  }, [])

  if (!hasPermission) {
    const titleText =
      typeof hasPermission === 'boolean'
        ? 'No access to camera'
        : 'Requesting for camera permission'
    return (
      <Wrapper>
        <Title hasMarginBottom>{titleText}</Title>
        <Button title="Allow Camera" onPress={askForCameraPermission} />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Body hasMarginBottom>Scan QR code</Body>
      <StyledScannerBlock>
        <QRScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 300, width: 300 }}
        />
      </StyledScannerBlock>
      <RotationBox disabled={!scanned}>
        <Button
          title={scanned ? 'Scan again' : 'Waiting for a scan...'}
          onPress={handleScanAgain}
          disabled={!scanned}
        />
      </RotationBox>
      <SecretPhrase data={barCodeValue} />
    </Wrapper>
  )
}

const Wrapper = styled.View`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mineShaft};
`

const StyledScannerBlock = styled.View`
  height: 300px;
  width: 300px;
  overflow: hidden;
  border-radius: 30;
  background-color: ${({ theme }) => theme.colors.black};
  margin-bottom: 16px;
`
