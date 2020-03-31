# Browser Technologies @cmda-minor-web 1920

## The case
A progressive enhancement form about the minor Web Development. The form should save your information so that it is filled in when you return to the web page. The web page should be progressive enhanced

## The Design

![image](https://user-images.githubusercontent.com/43671292/76964734-7a02d800-6923-11ea-9966-4e6d5171de73.png)
  
## Live demo
[Direct link](https://bt-giovanni.herokuapp.com/)
```
https://bt-giovanni.herokuapp.com/
```

## Features

- [x] Feature detection
- [x] Create a user hash
- [x] Save user data on page transition
- [x] Progressive Enhancement
- [x] Fits all browsers


## Installation

1. Open your terminal

2. Change the directory to a folder in which you want to place the files

``` 
cd /~path
```

3. Clone the repository 
```
git clone https://github.com/GiovanniKaaijk/browser-technologies-1920.git
```
4. Change directory to repository
```
cd browser-technologies-1920
```
5. Install dependencies from package.json
```
npm install
```
6. Run application with Node
```
node server.js
OR
npm run dev
```

## Feature Detection
> My idea behind feature detection is that you can use the css or js to determine whether a feature is supported in the current browser. When a feature is not supported, a more basic version will be displayed. By doing this, older browser are still able to display the basic version of the feature. 

A simple way to use feature detection is by using ```@supports``` within CSS. This will check whether the feature is supported by the browser or not. If the browser supports the feature, the feature will be applied, otherwise it will use the basic CSS written above.

 ```css
@supports not (display: flex) {
  .study input {
    margin-left: auto;
    float: right;
  }
  .study div {
    padding-bottom: 15px;
}
  
}

@supports (display: flex) {
    .study div {
        padding-bottom: 12px;
    }
    .study label {
        display: flex;
        line-height: 28px;
    }

    .study input[type='checkbox'] {
        margin-left: auto;
    }
}
 ```
 
### Examples
#### Chrome
On chrome, a step of the form looks like this:

<img src="https://user-images.githubusercontent.com/43671292/78027233-55642280-735d-11ea-88fe-db294a463831.png" width="200">

#### IE 11 
While on IE 11, a lot of feature are not supported, so the page will look like this:
<img src="https://user-images.githubusercontent.com/43671292/78024251-59da0c80-7358-11ea-8c3f-6b193151dd5b.png" width="200">


## Layers 
  ### Layer 1 (HTML)
  > This is the layer that only contains HTML

  This layer does not have any CSS or JavaScript, but the core functionality is still available.
    <img src="https://user-images.githubusercontent.com/43671292/78027523-ca375c80-735d-11ea-905a-6aa9905a54ac.png" width="200">
  
 ### Layer 2 (HTML and CSS)
  > This is layer contains CSS
The webpage is now looking more presentable. Basic CSS is applied, but there are no fancy styles yet.
  <img src="https://user-images.githubusercontent.com/43671292/78027715-1a162380-735e-11ea-803b-21703e63c7cb.png" width="200">
  
 ### Layer 3 (HTML, CSS and JS)
  > This is the layer that contains Javascript.

  On this layer, there is a better user experience. Page transitions are included, so it feels more like an app. Also sliders will be displayed with more fancy styles. 
  <img src="https://user-images.githubusercontent.com/43671292/78028151-d7088000-735e-11ea-83a4-2d9f822e89b6.png" width="200">

  
## Conclusion
#### Student kan de core functionaliteit van een use case doorgronden
- Na het testen op meedere browsers, ben ik van mening dat dit uistekend werkt. Op elke browser was de core functionaliteit uitstekend bruikbaar. Nergens liep ik tegen problemen aan.

#### Toegankelijkheid: De user experience is goed
- De user experience is goed, op alle browsers werken zo goed als alle styles. Op enkele browsers moest er teruggevallen worden op de CSS fallbacks, maar dit werkte prima. Ook is de website met een toetsenbord te gebruiken.

#### Readme: In de beschrijving van het project staat een probleemdefinitie, hoe het probleem is opgelost en een uitleg van de code.
- Ik heb een beschijving toegevoegd van de case, wat voor features ik gebruik en hoe ik dit toepas om de case op te lossen.

#### Student kan uitleggen wat Progressive enhancement is. 
- Progressive enhancement is voor mij het beschikbaar maken van jouw site voor iedereen. Van blinde mensen, tot mensen zonder JS, iedereen moet jouw pagina kunnen gebruiken. Pas als gebruikers nieuwe browsers gebruiken, kunnen dingen enhanced worden, waardoor de experience beter wordt.

#### Student laat zien hoe Progressive Enhancement toe te passen in Web Development
- Dit laat ik zien door de screenshots in mijn readme

#### Student kan uitleggen wat Feature detection is.
- Functiedetectie is dat je binnen CSS of Js kunt checken of bepaalde functies ondersteund worden. Als het dan niet wordt ondersteund, moet er een meer basic versie getoond worden, een fallback. Op deze manier zullen browsers die bepaalde functies in de CSS niet ondersteunen, de basic versie laten zien. Als de browser de functie wel ondersteund, begint het cascaderen van CSS en worden de waarden die in eerdere code zijn genoemd overschreven.

#### Student laat zien hoe Feature Detection kan worden toegepast in Web Development
- Dit heb ik beschreven bij [Feature detection](#feature-detection)

## Keep up to date
Make sure you pull the repository once in a while since we are still working on this project, you can do this by using ```git pull```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
