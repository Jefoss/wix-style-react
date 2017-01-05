# DropdownLayout component

> Dropdown layout Component to use in autocopmlete and select

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| options | array of option | - | - | Array of Option objects that will be render to the list |
| onSelect | func | - | - | Callback function called whenever the user selects a different option in the list |
| onClose | func | - | - | Callback function called whenever the user press escape or click outside the component |
| dropDirectionUp | bool | false | - | Whether the component opens up or down |
| visible | bool | true | - | Should show or hide the component |
| selectedId | string/number | - | - | The id of the selected option in the list |
| tabIndex| number | 1 | - | Specifies the tab order of the component |

## Option

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| id | string or number | - | + | The id of the option, should be unique |
| value | string or node | - | + | Can be a text or a react elements, if text is '-', a divider will render at that position. |
| disabled | bool | false | - | Is this option is disabled or not |
