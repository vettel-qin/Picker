# @vettel/picker

Picker 选择器

# 安装

```
  npm install @vettel/picker --save
  或
  yarn add @vettel/picker
```

# 按需加载

引入 babel-plugin-vettel-import 并在 .babelrc(推荐) 里进行配置或在 webpack 里进行配置

```
  npm install babel-plugin-vettel-import --save
  或
  yarn add babel-plugin-vettel-import
```

使用方式一：在  .babelrc 里进行配置(推荐):

// .babelrc

```
{
  "plugins": [
    ["vettel-import", {"library": "@vettel/picker"}]
  ]
}
```

使用方式二：在 webpack 里进行配置：

```
module: {
  rules: [{
    test: /\.js$/,
    loader: "babel-loader",
+   options: {
+     plugins: [
+       ["vettel-import", { "library": "@vettel/picker" }],
+     ]
+   }
  }]
},
```

# Example

```
  import { Picker } from '@vettel/picker';
```

上述代码经过此插件转换后等同于下列代码，从而实现按需加载

```
import Picker from '@vettel/picker/lib/picker';
```

# API

## Picker 选择器

| 属性        | 说明                                                           | 类型                                                                 | 默认值 | 是否必填 |
| ----------- | -------------------------------------------------------------- | -------------------------------------------------------------------- | ------ | -------- |
| data        | 数据源                                                         | 联动：Array<{value, id, children: Array}> 不联动：Array<{value, id}> | 无     | 是       |
| value       | 值，格式是[value1, value2, value3]，对应数据源的相应级层 value | Array                                                                | 无     | 否       |
| cols        | 列数                                                           | Number                                                               | 3      | 是       |
| onConfirm   | 点击确定时执行的回调                                           | (val): void                                                          | 无     | 是       |
| onCancel    | 点击取消时执行的回调                                           | (val): void                                                          | 无     | 否       |
| title       | 标题                                                           | String                                                               | 请选择 | 否       |
| confirmText | 确定按钮文案                                                   | String                                                               | 确定   | 否       |
| cancelText  | 取消按钮文案                                                   | String                                                               | 取消   | 否       |
| cascade     | 是否级联动                                                     | Boolean                                                              | true   | 否       |

## PickerView 选择器

|属性|说明|类型|默认值|是否必填|
|data|数据源|Array<{value, id}>|无|是|
| value | 值，格式是[value1, value2, value3]，对应数据源的相应级层 value | Array | 无 | 否 |
| cols | 列数 | Number | 3 | 是 |
|onChange|选中后的回调|(val): void|无|是|
| cascade | 是否级联动 | Boolean | true | 否 |

## AddressPicker 选择器

| 属性        | 说明                                                           | 类型                                      | 默认值 | 是否必填 |
| ----------- | -------------------------------------------------------------- | ----------------------------------------- | ------ | -------- |
| data        | 数据源                                                         | 联动：Array<{value, id, children: Array}> | 无     | 是       |
| value       | 值，格式是[value1, value2, value3]，对应数据源的相应级层 value | Array                                     | 无     | 否       |
| cols        | 列数                                                           | Number                                    | 3      | 是       |
| onConfirm   | 点击确定时执行的回调                                           | (val): void                               | 无     | 是       |
| onCancel    | 点击取消时执行的回调                                           | (val): void                               | 无     | 否       |
| title       | 标题                                                           | String                                    | 请选择 | 否       |
| confirmText | 确定按钮文案                                                   | String                                    | 确定   | 否       |
| cancelText  | 取消按钮文案                                                   | String                                    | 取消   | 否       |
