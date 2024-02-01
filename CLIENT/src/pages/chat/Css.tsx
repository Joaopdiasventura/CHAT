import styled from "styled-components";

export const css = () => {
  return styled.div`
    width: 100%;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    height: 100vh;
    background-color: black;
    color: white;
    overflow: hidden;

    * {
      padding: 0;
      margin: 0;
      transition: all 0.5s;
    }

    #sidebar {
      width: 15%;
      background-color: #f1f1f1;
      padding: 20px;
      margin: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      overflow-y: auto;
      background-color: black;
      color: white;
    }

    #main {
      flex: 1;
      padding: 20px;
      box-sizing: border-box;
      background-color: black;
      color: white;
      border: 1px solid #ccc;
      margin: 10px;
    }

    #conversation {
      height: 85%;
      border: 1px solid #ccc;
      padding: 20px;
      overflow-y: auto;
      background-color: black;
      color: white;
    }

    #iadd {
      margin-bottom: 7.5px;
      background-color: black;
      color: white;
      border: 1px solid white;
      padding: 5px;
      border-radius: 10px;
      cursor: pointer;
    }

    #iadd:hover {
      scale: 1.05;
      color: red;
    }
    #out {
      margin-bottom: 7.5px;
      background-color: black;
      color: white;
      border: 1px solid white;
      padding: 5px;
      border-radius: 10px;
      cursor: pointer;
    }

    #out:hover {
      scale: 1.05;
      color: red;
    }

    input[type="text"] {
      width: calc(90% - 2px);
      padding: 0.5%;
      border: 1px solid #cf1b1b;
      margin-top: 10px;
      background-color: black;
      color: white;
      border-radius: 10px;
    }

    input[type="submit"] {
      width: calc(8% - 2px);
      padding: 0.5%;
      border: 1px solid #cf1b1b;
      margin-top: 10px;
      background-color: black;
      color: white;
      border-radius: 10px;
    }

    .usuario {
      position: relative;
      text-align: end;
      margin-top: 5px;
      margin-bottom: 5px;
      padding: 10px;
      background-color: #cf1b1b;
      color: white;
      border: 1px solid white;
      border-radius: 10px;
      max-width: 40%;
      margin-left: auto;
      word-wrap: break-word;
    }

    .usuario p {
      text-align: start;
    }

    .amigo {
      position: relative;
      text-align: start;
      margin-top: 5px;
      margin-bottom: 5px;
      padding: 10px;
      background-color: white;
      color: red;
      border: 1px solid #cf1b1b;
      border-radius: 10px;
      width: 50%;
      margin-right: auto;
      word-wrap: break-word;
    }

    .contato {
      margin-top: 4px;
      border-radius: 10px;
      border: 1px solid red;
      padding: 5px;
      cursor: pointer;
      overflow: hidden;
    }

    .contato small {
      color: red;
    }

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: black;
    }

    ::-webkit-scrollbar-thumb {
      background: white;
      border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: red;
    }

    #add {
      text-align: center;
      width: 250px;
      height: 100px;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #0a0a0a;
      box-shadow: 0 5px 15px rgba(255, 255, 255, 0.35);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 20px;
      display: none;
      color: white;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    #add p {
      left: 90%;
      top: 5%;
      position: absolute;
      color : lightgray;
      cursor: pointer;
    }

    #add input[type="submit"] {
      width: calc(50% - 2px);
      padding: 0.5%;
      border: none;
      border: 0.5px solid #000000;
      margin-top: 10px;
      background-color: #0a0a0a;
      color: rgb(255, 255, 255);
      outline: none;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      cursor: pointer;
    }

    #email {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      width: calc(90% - 2px);
      padding: 0.5%;
      border: none;
      border-bottom: 1px solid #000000;
      margin-top: 10px;
      color: white;
      outline: none;
      background-color: #0a0a0a;
      text-align: center;
    }

    #add input[type="submit"]:hover{
      scale: 1.2;
    } 

    #add:hover {
      scale: 1;
      color: white;
    }

    @media only screen and (max-width: 767px) {
      flex-direction: column;
      body {
        flex-direction: column;
      }

      #sidebar,
      #main {
        width: 100%;
        margin: 0;
      }

      #sidebar {
        height: 50%;
        overflow-y: auto;
      }

      #main {
        padding: 10px;
      }

      #add {
        width: 80%;
      }

      #conversation {
        height: 300px;
      }

      #contacts {
        text-align: center;
      }

      input[type="text"],
      input[type="submit"],
      #email {
        width: 100%;
      }

    }
  `;
};