import React, { useState } from 'react';
import styles from './MainFeedScreen.module.css';
import logoSrc from '@/assets/logo.svg';

interface MainFeedScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onOpenCamera?: () => void;
  onOpenNotifications?: () => void;
}

export const MainFeedScreen: React.FC<MainFeedScreenProps> = ({ onOpenCamera, onOpenNotifications }) => {
  const [activeTab, setActiveTab] = useState<'actual' | 'archive'>('actual');
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);

  return (
    <div className={styles.screen}>
      <div className={styles.appBackground} aria-hidden="true" />

      <div className={styles.contentLayer}>
        
        {/* Top Header Row: Address & Notifications */}
        <div className={styles.headerRow}>
          <div className={styles.addressContainer}>
            <div 
              className={styles.addressWrap} 
              onClick={() => setIsAddressDropdownOpen(!isAddressDropdownOpen)}
            >
              <span className={styles.addressText}>ул. Космонавтов 34а</span>
              <svg 
                className={styles.chevronIcon} 
                style={{ transform: isAddressDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            
            {isAddressDropdownOpen && (
              <div className={styles.addressDropdown}>
                <div className={styles.addressDropdownItem} onClick={() => setIsAddressDropdownOpen(false)}>
                  <div className={styles.addressDropdownText}>
                    <span>ул. Космонавтов 34а</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <div className={styles.addressDropdownItem} onClick={() => setIsAddressDropdownOpen(false)}>
                  <div className={styles.addressDropdownText}>ул. Пушкинская, 42</div>
                </div>
                <div className={styles.addressDropdownDivider} />
                <div className={styles.addressDropdownItem} onClick={() => setIsAddressDropdownOpen(false)}>
                  <div className={styles.addressDropdownAdd}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Добавить адрес
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button 
            className={styles.bellButton}
            type="button"
            aria-label="Уведомления"
            onClick={onOpenNotifications}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <div className={styles.notificationDot} />
          </button>
        </div>

        {/* Centered Logo Area */}
        <div className={styles.logoHeroArea}>
          <div className={styles.logoContainer}>
            <img src={logoSrc} alt="Logo" className={styles.heroLogo} />
          </div>
        </div>

        <div className={styles.scrollArea}>
          {/* Segmented Control / Filters */}
          <div className={styles.segmentedControlWrapper}>
            <div className={styles.segmentedControl}>
              <button 
                className={`${styles.segment} ${activeTab === 'actual' ? styles.active : styles.inactive}`}
                onClick={() => setActiveTab('actual')}
              >
                Актуальное
              </button>
              <button 
                className={`${styles.segment} ${activeTab === 'archive' ? styles.active : styles.inactive}`}
                onClick={() => setActiveTab('archive')}
              >
                Архив
              </button>
            </div>
          </div>

          {/* Feed Cards */}
          <div className={styles.feedList}>
            {activeTab === 'actual' ? (
              <>
                {/* Card 1 */}
                <div className={`${styles.card} ${styles.statusWait}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconWrap}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div className={styles.badge}>Ожидает УК</div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>Отключение горячей воды</h3>
                    <p className={styles.cardSubtitle}>12.08 – 26.08</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className={`${styles.card} ${styles.statusActive}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconWrap}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <div className={styles.badge}>Критично</div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>Авария на теплотрассе</h3>
                    <p className={styles.cardSubtitle}>Сегодня, 14:30 – 18:00</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Archive Card 1 */}
                <div className={`${styles.card} ${styles.statusArchive}`} style={{ opacity: 0.6 }}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconWrap}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className={styles.badge}>Завершено</div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>Проверка пожарной сигнализации</h3>
                    <p className={styles.cardSubtitle}>Вчера, 10:00 – 11:00</p>
                  </div>
                </div>

                {/* Archive Card 2 */}
                <div className={`${styles.card} ${styles.statusArchive}`} style={{ opacity: 0.6 }}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconWrap}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className={styles.badge}>Завершено</div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>Плановый ремонт подъезда</h3>
                    <p className={styles.cardSubtitle}>01.07 – 15.07</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <button className={styles.fab} onClick={onOpenCamera}>
        <svg className={styles.fabIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};
