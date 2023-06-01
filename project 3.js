# ibrahem-projects

 "use strict";
const ps = require('prompt-sync');
const prompt = ps({ sigint: true });
const fs = require('fs');
const path = require('path');

function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

function writeFile(filepath, data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data, null, 2);
    const absolutePath = path.resolve(filepath);

    fs.writeFile(absolutePath, jsonData, 'utf8', (err) => {
   if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function readFile(filepath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filepath);
    fs.readFile(absolutePath, 'utf8', (err, jsonData) => {
      if (err) {
        reject(err);}
         else {
        try {
          const data = JSON.parse(jsonData);
          resolve(data);
        } catch (error) {
          reject(error);
      }    }
    });
  });
}

async function fetchDataAndWriteToFile(url, filepath) {
  try {
    const data = await fetchData(url);
    await writeFile(filepath, data);
    console.log('Data fetched and written to file successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function writeToFile(filepath, data) {
  try {
    await writeFile(filepath, data);
    console.log('Data written to file successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function readDataFromFile(filepath) {
  try {
    const data = await readFile(filepath);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const apiUrl = 'https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON';
const filePath = './file.json';
fetchDataAndWriteToFile(apiUrl, filePath);

function printAction() {
  console.log(`Choose your action:
                 1- List all movies.
                 2- Search for a movie.
                 3- Delete a movie.
                 **********************`);
}

async function listAllMovies(filePath) {
  try {
    const data = await readDataFromFile(filePath);
    if (data) {
      let i = 1;
      data.forEach(element => {
        console.log(`${i++}- [Title: ${element.Title}, Year: ${element.Year}, Runtime: ${element.Runtime}, Genre: ${element.Genre}, Director: ${element.Director}]`);
      });
    } else {
      console.log('Error occurred while reading data from the file.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function searchAboutMovie(filepath) {
  try {
    const data = await readDataFromFile(filepath);
    if (!data) {
      console.log('Error occurred while reading data from the file.');
      return;
    }

    console.log(`Select the search method:
                1- Director's name
                2- Movie name
                3- Movie type`);

    const choice = Number(prompt('What is your choice?'));
    let secondChoice;

    if (choice === 1) {
      secondChoice = prompt("What is the director's name?");
      const filteredData = data.filter(element => element.Director.toLowerCase() === secondChoice.toLowerCase());
      if (filteredData.length === 0) {
        console.log('We do not have a movie with this director name.');
      } else {
        let i = 1;
        filteredData.forEach(element => {
          console.log(`${i++}- [Title: ${element.Title}, Year: ${element.Year}, Runtime: ${element.Runtime}, Genre: ${element.Genre}, Director: ${element.Director}]`);
        });
      }
    } else if (choice === 2) {
      secondChoice = prompt('What is the movie name?');
      const filteredData = data.filter(element => element.Title.toLowerCase() === secondChoice.toLowerCase());
      if (filteredData.length === 0) {
        console.log('We do not have a movie with this name.');
      } else {
        let i = 1;
        filteredData.forEach(element => {
          console.log(`${i++}- [Title: ${element.Title}, Year: ${element.Year}, Runtime: ${element.Runtime}, Genre: ${element.Genre}, Director: ${element.Director}]`);
        });
      }
    } else if (choice === 3) {
      secondChoice = prompt('What is the movie type?');
      const filteredData = data.filter(element => {
        const genres = element.Genre.split(', ');
        return genres.some(genre => genre.toLowerCase() === secondChoice.toLowerCase());
      });

      if (filteredData.length === 0) {
        console.log('We do not have a movie with this genre.');
      } else {
        let i = 1;
        filteredData.forEach(element => {
          console.log(`${i++}- [Title: ${element.Title}, Year: ${element.Year}, Runtime: ${element.Runtime}, Genre: ${element.Genre}, Director: ${element.Director}]`);
        });
      }
    }
    else {
      console.log('Wrong choice');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


async function deleteMovie(filePath) {
  try {
    const data = await readDataFromFile(filePath);
    if (!data) {
      console.log('Error occurred while reading data from the file.');
      return;
    }

    let movieName = prompt(`Enter the name of the movie you want to delete: `);
    let movieIndex = data.findIndex(movie => movieName.toLowerCase() === movie.Title.toLowerCase());
    if (movieIndex !== -1) {
      data.splice(movieIndex, 1);
      await writeToFile(filePath, data);
      console.log('Movie deleted successfully.');
    } else {
      console.log('Movie not found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


async function main(filePath){
  
  let a;
  while(a!=0){
    printAction();
    let a=prompt(`enter your choise: `);
    if(a==1){
     await listAllMovies(filePath);
    }
    else if(a==2){
      await searchAboutMovie(filePath);
    }
    else if (a==3) {
      await  deleteMovie(filePath);
    }
    else if(a==0){
      console.log(`goodBye`);
    }
    else{
      console.log(`wrong choise`);
    }
  }
}
main(filePath);



