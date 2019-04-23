/**
 * Author: Sam Heutmaker [samheutmaker@gmail.com]
 */

import {
  learningGroup1,
  learningGroup2,
  learningGroup3,
  learningGroup4,
  learningGroup5,
  learningGroup6,
} from "./BeanGroups";

const POSITIVE_BEAN_VALUE = 10;
const NEGATIVE_BEAN_VALUE = -10;

export default function calculateBeanValue(condition, bean){
  if (condition === 0 &&
    (
      learningGroup1.includes(bean) ||
      learningGroup3.includes(bean) ||
      learningGroup5.includes(bean)
    )
  ) {
    return POSITIVE_BEAN_VALUE;
  }

  if (condition === 0 &&
    (
      learningGroup2.includes(bean) ||
      learningGroup4.includes(bean) ||
      learningGroup6.includes(bean)
    )
  ) {
    return NEGATIVE_BEAN_VALUE;
  }

  if (condition === 1 &&
    (
      learningGroup1.includes(bean) ||
      learningGroup3.includes(bean) ||
      learningGroup5.includes(bean)
    )
  ) {
    return NEGATIVE_BEAN_VALUE;
  }

  if (condition === 1 &&
    (
      learningGroup2.includes(bean) ||
      learningGroup4.includes(bean) ||
      learningGroup6.includes(bean)
    )
  ) {
    return POSITIVE_BEAN_VALUE;
  }
}