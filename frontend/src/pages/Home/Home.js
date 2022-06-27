import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useSelector } from "react-redux";
import "./Home.css";

const Home = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const [ jawaban, setJawaban ] = useState('');
  const [ terbilang, setTerbilang ] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  });

  const tokenize = (s) => {
    // --- Parse a calculation string into an array of numbers and operators
    const r = [];
    let token = '';
    for (const character of s) {
      if ('^*/+-'.indexOf(character) > -1) {
        if (token === '' && character === '-') {
          token = '-';
        } else {
          r.push(parseFloat(token), character);
          token = '';
        }
      } else {
        token += character;
      }
    }
    if (token !== '') {
      r.push(parseFloat(token));
    }
    return r;
  }

  const calculate = (tokens) => {
    // --- Perform a calculation expressed as an array of operators and numbers
    const operatorPrecedence = [{ '^': (a, b) => Math.pow(a, b) },
    { '*': (a, b) => a * b, '/': (a, b) => a / b },
    { '+': (a, b) => a + b, '-': (a, b) => a - b }];
    let operator;
    for (const operators of operatorPrecedence) {
      const newTokens = [];
      for (const token of tokens) {
        if (token in operators) {
          operator = operators[token];
        } else if (operator) {
          newTokens[newTokens.length - 1] =
            operator(newTokens[newTokens.length - 1], token);
          operator = null;
        } else {
          newTokens.push(token);
        }
      }
      tokens = newTokens;
    }
    if (tokens.length > 1) {
      console.log('Error: unable to resolve calculation');
      return tokens;
    } else {
      return tokens[0];
    }
  }

  const setValue = (arg) => {

    var splitWords = jawaban.split('');

    if(arg === splitWords[splitWords.indexOf('*')] || arg === splitWords[splitWords.indexOf('+')] || arg === splitWords[splitWords.indexOf('-')] || arg === splitWords[splitWords.indexOf('/')]) {
      setJawaban(jawaban)
    } else {
      setJawaban(jawaban + arg)
    }
  }

  const hasilHitung = () => {
    const hasil = calculate(tokenize(jawaban));
    setJawaban(hasil)
  }

  const clearAll = () => {
    setJawaban('');
    setTerbilang('');
  }

  const ubahTerbilang = () => {
    const a = ['','Satu ','Dua ','Tiga ','Empat ', 'Lima ','Enam ','Tujuh ','Delapan ','Sembilan ','Sepuluh ','Sebelas ','Dua Belas ','Tiga Belas ','Empat Belas ','Lima Belas ','Enam Belas ','Tujuh Belas ','Delapan Belas ','Sembilan Belas '];
    const b = ['', '', 'Dua Puluh','Tiga Puluh','Empat Puluh','Lima Puluh', 'Enam Puluh','Tujuh Puluh','Delapan Puluh','Sembilan Puluh'];

    const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/;

    const getLT20 = (n) => a[Number(n)];
    const getGT20 = (n) => b[n[0]] + ' ' + a[n[1]];

    const num = Number(jawaban);
    
    if (isNaN(num)){
      setTerbilang("Error")
    }
    if (num === 0 || num === '0') {
      setTerbilang("Nol")
    }

    const numStr = num.toString()
    if (numStr.length > 9) {
      setTerbilang("Terlalu Banyak Angka") // Does not support converting more than 9 digits yet
    }

    const [, n1, n2, n3, n4, n5] = ('000000000' + numStr).substr(-9).match(regex) // left pad zeros

    let str = ''
    str += n1 != 0 ? (getLT20(n1) || getGT20(n1)) + 'Miliar ' : ''
    str += n2 != 0 ? (getLT20(n2) || getGT20(n2)) + 'Juta ' : ''
    str += n3 != 0 ? (getLT20(n3) || getGT20(n3)) + 'Ribu ' : ''
    str += n4 != 0 ? getLT20(n4) + 'Ratus ' : ''
    str += n5 != 0 && str != '' ? 'Dan ' : ''
    str += n5 != 0 ? (getLT20(n5) || getGT20(n5)) : ''

    setTerbilang(str.trim());
  }

  return (
    <MainScreen title={`Selamat Datang ${userInfo && userInfo.name}`}>
      <div className="frame">
        <div className="mainCalc">
          <div className="screen-row ">
            <input type="text" value={jawaban} readOnly/><br />
            <input type="text" value={terbilang} readOnly/>
          </div>
          <div className="button-row">
            <input type="button" value={'Bersih'} onClick={clearAll}/>
            <input type="button" value={'/'} onClick={() => setValue('/')}/>
          </div>
          <div className="button-row">
            <input type="button" value={'7'} onClick={() => setValue('7')}/>
            <input type="button" value={'8'} onClick={() => setValue('8')}/>
            <input type="button" value={'9'} onClick={() => setValue('9')}/>
            <input type="button" value={'*'} onClick={() => setValue('*')}/>
          </div>
          <div className="button-row">
            <input type="button" value={'4'} onClick={() => setValue('4')}/>
            <input type="button" value={'5'} onClick={() => setValue('5')}/>
            <input type="button" value={'6'} onClick={() => setValue('6')}/>
            <input type="button" value={'-'} onClick={() => setValue('-')}/>
          </div>
          <div className="button-row">
            <input type="button" value={'1'} onClick={() => setValue('1')}/>
            <input type="button" value={'2'} onClick={() => setValue('2')}/>
            <input type="button" value={'3'} onClick={() => setValue('3')}/>
            <input type="button" value={'+'} onClick={() => setValue('+')}/>
          </div>
          <div className="button-row">
            <input type="button" value={'0'} onClick={() => setValue('0')} />
            <input type="button" value={'='} onClick={hasilHitung}/>
            <input type="button" value={'Terbilang'} onClick={ubahTerbilang}/>
          </div>
        </div>
      </div>
    </MainScreen>
  );
}

export default Home;