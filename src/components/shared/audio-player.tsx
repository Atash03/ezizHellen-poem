import React, { useState, useRef } from 'react';
import { Howl } from 'howler';
import { CirclePauseIcon } from 'lucide-react';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);
  const [currentTime, setCurrentTime] = useState(0); // Текущее время воспроизведения
  const [duration, setDuration] = useState(0); // Общая длина аудиофайла
  const progressBarRef = useRef<HTMLInputElement>(null); // Ссылка на прогресс-бар

  // Загружаем аудиофайл
  const loadSound = () => {
    const newSound = new Howl({
      src: ['/images/sound.mp3'], // Укажите путь к вашему аудиофайлу
      html5: true,
      onplay: () => {
        setDuration(newSound.duration()); // Устанавливаем продолжительность
      },
      onend: () => {
        setIsPlaying(false); // Останавливаем при завершении
      },
    });

    setSound(newSound);
  };

  // Воспроизведение или пауза
  const playPause = () => {
    if (!sound) {
      loadSound();
    }

    if (isPlaying) {
      sound?.pause();
    } else {
      sound?.play();
      updateProgress(); // Начинаем обновление прогресса
    }

    setIsPlaying(!isPlaying);
  };

  // Функция обновления прогресса
  const updateProgress = () => {
    if (sound) {
      const interval = setInterval(() => {
        setCurrentTime(sound.seek() as number); // Обновляем текущее время
      }, 1000); // Обновляем каждую секунду

      // Останавливаем обновление при завершении воспроизведения
      sound.on('end', () => {
        clearInterval(interval);
      });
    }
  };

  // Обработчик кликов на прогресс-баре
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (progressBarRef.current && sound) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPositionX = e.clientX - rect.left; // Позиция клика по оси X
      const width = rect.width; // Ширина прогресс-бара
      const clickRatio = clickPositionX / width; // Соотношение клика к ширине
      const newTime = clickRatio * duration; // Новое время на основе клика
      sound.seek(newTime); // Перематываем аудио
      setCurrentTime(newTime); // Обновляем текущее время
    }
  };

  // Форматирование времени в "mm:ss"
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col mt-8 xl:mt-16 p-4 bg-transparent border border-OUTLINE rounded-[4px] xl:w-[400px] mx-auto">
      <h5 className="text-16 !font-semibold mb-3 text-left">Kakamyň sagady</h5>

      <div className="flex items-center w-full font-medium h-6 text-[14px] leading-[145%]">
        <button onClick={playPause} className="mr-2">
          {!isPlaying ? (
            <img src="/images/play.svg" className="size-8 h-fit" />
          ) : (
            <CirclePauseIcon size={23.5} />
          )}
          {/* <img src={isPlaying ? '' : '/images/play.svg'} alt="" /> */}
        </button>
        <span>{formatTime(currentTime)}</span>

        <div
          ref={progressBarRef}
          className="w-full bg-OUTLINE_VAR h-0.5 mx-3 rounded-lg cursor-pointer"
          onClick={handleProgressClick} // Обработка клика по прогресс-бару
        >
          <div
            className="bg-PRIM h-full relative rounded-lg after:absolute after:right-0 after:-top-[3px] after:size-2 after:bg-PRIM after:rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }} // Прогресс от 0 до 100
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex justify-between w-full text-[14px] leading-[145%]"></div>
    </div>
  );
};

export default AudioPlayer;
