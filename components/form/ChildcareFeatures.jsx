import React, { useState } from 'react';
import { useFeatureIsOn } from "@growthbook/growthbook-react";

const ChildcareFeatures = () => {
    const [needBabysitter, setNeedBabysitter] = useState(false);

    const enabled = useFeatureIsOn('childcare_feature');
    if (enabled) {

return (
        <div className="babysitter-container">
        <label className="babysitter">
            Childcare Needed?
                <input
                  type="checkbox"
                  name="babysitter"
                  checked={needBabysitter}
                  onChange={() => setNeedBabysitter(!needBabysitter)}
                />
        </label>
        </div>
        )
    }
}
export default ChildcareFeatures;
