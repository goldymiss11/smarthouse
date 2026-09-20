import React from 'react';
import styles from './UKAnalyticsScreen.module.css';

interface UKAnalyticsScreenProps {
  onBack: () => void;
}

export const UKAnalyticsScreen: React.FC<UKAnalyticsScreenProps> = ({ onBack }) => {
  const weeklyData = [
    { day: 'Пн', value: 40 },
    { day: 'Втор', value: 65 },
    { day: 'Ср', value: 85 },
    { day: 'Чт', value: 50 },
    { day: 'Пт', value: 90 },
    { day: 'Сб', value: 30 },
    { day: 'Вс', value: 20 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Назад
        </button>
        <div className={styles.navTitle}>Аналитика</div>
      </div>

      <div className={styles.content}>
        <div className={styles.aiSummary}>
          <div className={styles.aiTitle}>✨ ИИ-анализ за неделю</div>
          <div className={styles.aiText}>
            В районе пр. Космонавтов участились жалобы на напор воды. 
            Скорость закрытия заявок выросла на 15% по сравнению с прошлым месяцем.
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>Типы обращений</div>
          <div className={styles.progressList}>
            <div className={styles.progressItem}>
              <div className={styles.progressLabelWrap}>
                <span>Водоснабжение</span>
                <span className={styles.progressValue}>60%</span>
              </div>
              <div className={styles.progressBarBg}>
                <div className={`${styles.progressBarFill} ${styles.fillWater}`} />
              </div>
            </div>
            <div className={styles.progressItem}>
              <div className={styles.progressLabelWrap}>
                <span>Электричество</span>
                <span className={styles.progressValue}>30%</span>
              </div>
              <div className={styles.progressBarBg}>
                <div className={`${styles.progressBarFill} ${styles.fillElectro}`} />
              </div>
            </div>
            <div className={styles.progressItem}>
              <div className={styles.progressLabelWrap}>
                <span>Прочее</span>
                <span className={styles.progressValue}>10%</span>
              </div>
              <div className={styles.progressBarBg}>
                <div className={`${styles.progressBarFill} ${styles.fillOther}`} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>Нагрузка по дням</div>
          <div className={styles.verticalChart}>
            {weeklyData.map((item, idx) => (
              <div key={idx} className={styles.barCol}>
                <div className={styles.barWrapper}>
                  <div className={styles.vBar} style={{ height: `${item.value}%` }} />
                </div>
                <div className={styles.barDay}>{item.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
