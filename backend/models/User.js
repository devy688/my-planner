import mongoose from 'mongoose';

const defaultProfileImage = '/default-profile.png';

const UserSchema = new mongoose.Schema(
    {
        // 닉네임
        nickname: {
            type: String,
            required: true,
        },
        // 이메일
        email: {
            type: String,
            unique: true,
            trim: true,
        },
        // 회원가입시 패스워드
        password: {
            type: String,
            required: function () {
                return !this.socialMediaId;
            },
        },
        // 소셜 미디어 ID
        socialMediaId: {
            type: String,
            unique: true,
            sparse: true,
        },
        // 소셜 미디어 타입
        socialMediaType: {
            type: String,
            required: false,
        },
        // 프로필 이미지
        profileImage: {
            type: String,
            required: true,
            default: defaultProfileImage,
        },
    },
    // createdAt과 updatedAt 필드가 자동으로 관리됨
    { timestamps: true }
);

UserSchema.index({ socialMediaId: 1 }, { unique: true, sparse: true });

const User = mongoose.model('User', UserSchema);
export default User;
