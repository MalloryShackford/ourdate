export function getProfileData() {

    let profileData = {
        partnerName: localStorage.getItem('partnerName') || '',
        relationshipStatus: localStorage.getItem('relationshipStatus') || '',
        loveLanguage: localStorage.getItem('loveLanguage') || '',
        partnerLoveLanguage: localStorage.getItem('partnerLoveLanguage') || '',
        favActivities: localStorage.getItem('favActivities') || '',
        avoidActivity: localStorage.getItem('avoidActivity') || '',
        dietaryNeeds: localStorage.getItem('dietaryNeeds') || '',
        alcoholPref: localStorage.getItem('alcoholPref') || '',
        relationshipGoals: []
        };
    
        try {
          const storedGoals = localStorage.getItem('relationshipGoals');
          profileData.relationshipGoals = storedGoals ? JSON.parse(storedGoals) : [];
        } catch (error) {
          console.error('Error parsing relationshipGoals from localStorage:', error);
        }
    
        return profileData;
      }
    
      const profileData = getProfileData();
    