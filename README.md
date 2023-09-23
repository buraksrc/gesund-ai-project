## Description
A project I made with TypeScript, React.js, Redux and Tailwind CSS. You can add nodes, delete nodes, change their names and values, pass values between them and save the nodes to Local Storage. Layout will automatically expand as trees grow. 

## UI Libraries
I also used Heroicons for icons, Headless UI for dialog and dropdown components and react-xarrows for drawing lines between nodes. Rest are made with classic HTML components and Tailwind CSS.

## Notes
I've tried to use Redux whenever possible, but for managing internal states (ex: dialog) I've used useState hook instead. My main rule was not to use useEffect hook at all and pay attention if I am duplicating the code and convert them to components or functions.\
I wanted to write tests but due to schedule I couldn't write any.

## Running
It is a simple node application so 

```
npm i && npm run dev
```

will suffice.


