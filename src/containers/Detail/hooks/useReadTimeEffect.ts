import { useEffect, useState } from 'react';

const useReadTimeEffect = () => {

  const readingTime= (text:any) => {
    const averageWPM = 225;

    const words = text.trim().split(/\s+/);
    return Math.ceil(words.length/ averageWPM)

    const adjustedText = text.replace(/(.)\1+/g, '$1');

    const adjustedSentences = adjustedText.replace(/([.!?])\s*\1+/g, '$1');

    const adjustedCharCount = adjustedSentences.length;

    const adjustedWords = adjustedSentences.trim().split(/\s+/);
    const adjustedWordCount = adjustedWords.length;
    const averageWordLength = adjustedCharCount / adjustedWordCount;

    const adjustedTime = (adjustedCharCount / averageWPM) * (averageWordLength / 5);

    const formattedAdjustedTime = adjustedTime > 1 ? Math.round(adjustedTime) + " min" : "Less than 1 min";

    return formattedAdjustedTime;
  }

  useEffect(() => {
    if (!document) return
    const timeElement = document.getElementById("time");
    const pageElement = document.getElementsByClassName("notion-page")
    if (!pageElement || !timeElement) return
 
    const text = pageElement[0].textContent
    timeElement.innerText = `Tempo estimado de leitura: ${readingTime(text)} minutos`;
   
  }, [])

  return
}

export default useReadTimeEffect
