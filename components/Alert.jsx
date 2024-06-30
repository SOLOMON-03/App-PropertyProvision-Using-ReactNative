import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const Alert = () => {
  return (
    <View className='space-y-5'>
      <View className='bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30' role='alert'>
        <View className='flex'>
            <View className='flex-shrink-0'>
                <View className='inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400'>
                    <Image
                    source={icons.plus}
                    className="w-7 h-7"
                    />
                </View>
            </View>
            <View className='ms-3'>
                <Text className='text-gray-800 font-semibold dark:text-white'>Success</Text>
                <Text className='text-sm text-gray-700 dark:text-neutral-400'>You have successfully updated</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

export default Alert