import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({ title, subtitle, containerStyle, titleStyle}) => {
  return (
    <View className={containerStyle}>
      <Text className={`text-white text-center font-SwanseaBold ${titleStyle}`}>{title}</Text>
      <Text className='text-sm text-emerald-500 font-MontserratMedium'>{subtitle}</Text>
    </View>
  )
}

export default InfoBox