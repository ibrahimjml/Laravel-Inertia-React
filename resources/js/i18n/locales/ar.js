export default {
    ar: {
        auth: {
            login: "تسجيل الدخول",
            register: "تسجيل",
            email_address: "عنوان البريد الإلكتروني",
            pass: "كلمة المرور",
            remember_me: "تذكرني",
            forgot_your_password: "نسيت كلمة المرور",
            dont_have_an_account: "ليس لديك حساب؟",
            failed: "بيانات الاعتماد هذه لا تتطابق مع سجلاتنا.",
            password: "كلمة المرور المقدمة غير صحيحة.",
            throttle:  "محاولات تسجيل دخول كثيرة جدًا. يرجى المحاولة مرة أخرى بعد :seconds ثانية.",
        },
        pagination: {
            previous: "&laquo; السابق",
            next: "التالي &raquo;",
        },
        validation: {
            accepted: "يجب قبول الحقل {attribute}.",
            accepted_if:
                "يجب قبول الحقل {attribute} عندما يكون {other} هو {value}.",
            active_url: "الحقل {attribute} يجب أن يكون رابطًا صالحًا.",
            after: "الحقل {attribute} يجب أن يكون تاريخًا بعد {date}.",
            after_or_equal:
                "الحقل {attribute} يجب أن يكون تاريخًا بعد أو يساوي {date}.",
            alpha: "الحقل {attribute} يجب أن يحتوي على أحرف فقط.",
            alpha_dash:
                "الحقل {attribute} يجب أن يحتوي على أحرف وأرقام وشرطات فقط.",
            alpha_num: "الحقل {attribute} يجب أن يحتوي على أحرف وأرقام فقط.",
            array: "الحقل {attribute} يجب أن يكون مصفوفة.",
            ascii: "الحقل {attribute} يجب أن يحتوي على أحرف أبجدية رقمية ذات بايت واحد ورموز فقط.",
            before: "الحقل {attribute} يجب أن يكون تاريخًا قبل {date}.",
            before_or_equal:
                "الحقل {attribute} يجب أن يكون تاريخًا قبل أو يساوي {date}.",
            between: {
                array: "الحقل {attribute} يجب أن يحتوي بين {min} و {max} عنصر.",
                file: "الحقل {attribute} يجب أن يكون بين {min} و {max} كيلوبايت.",
                numeric: "الحقل {attribute} يجب أن يكون بين {min} و {max}.",
                string: "الحقل {attribute} يجب أن يكون بين {min} و {max} حرف.",
            },
            boolean: "الحقل {attribute} يجب أن يكون صحيحًا أو خاطئًا.",
            can: "الحقل {attribute} يحتوي على قيمة غير مصرح بها.",
            confirmed: "تأكيد الحقل {attribute} لا يتطابق.",
            contains: "الحقل {attribute} يفتقد قيمة مطلوبة.",
            current_password: "كلمة المرور غير صحيحة.",
            date: "الحقل {attribute} يجب أن يكون تاريخًا صالحًا.",
            date_equals: "الحقل {attribute} يجب أن يكون تاريخًا يساوي {date}.",
            date_format: "الحقل {attribute} يجب أن يتطابق مع الصيغة :format.",
            decimal:
                "الحقل {attribute} يجب أن يحتوي على {decimal} منازل عشرية.",
            declined: "يجب رفض الحقل {attribute}.",
            declined_if:
                "يجب رفض الحقل {attribute} عندما يكون {other} هو {value}.",
            different: "الحقل {attribute} و {other} يجب أن يكونا مختلفين.",
            digits: "الحقل {attribute} يجب أن يكون {digits} أرقام.",
            digits_between:
                "الحقل {attribute} يجب أن يكون بين {min} و {max} أرقام.",
            dimensions: "الحقل {attribute} يحتوي على أبعاد صورة غير صالحة.",
            distinct: "الحقل {attribute} يحتوي على قيمة مكررة.",
            doesnt_end_with:
                "الحقل {attribute} يجب ألا ينتهي بأي من القيم التالية: {value}s.",
            doesnt_start_with:
                "الحقل {attribute} يجب ألا يبدأ بأي من القيم التالية: {value}s.",
            email: "الحقل {attribute} يجب أن يكون عنوان بريد إلكتروني صالح.",
            ends_with:
                "الحقل {attribute} يجب أن ينتهي بأحد القيم التالية: {value}s.",
            enum: "{attribute} المختار غير صالح.",
            exists: "{attribute} المختار غير صالح.",
            extensions:
                "الحقل {attribute} يجب أن يكون له أحد الامتدادات التالية: {value}s.",
            file: "الحقل {attribute} يجب أن يكون ملفًا.",
            filled: "الحقل {attribute} يجب أن يحتوي على قيمة.",
            gt: {
                array: "الحقل {attribute} يجب أن يحتوي على أكثر من {value} عنصر.",
                file: "الحقل {attribute} يجب أن يكون أكبر من {value} كيلوبايت.",
                numeric: "الحقل {attribute} يجب أن يكون أكبر من {value}.",
                string: "الحقل {attribute} يجب أن يكون أكبر من {value} حرف.",
            },
            gte: {
                array: "الحقل {attribute} يجب أن يحتوي على {value} عناصر أو أكثر.",
                file: "الحقل {attribute} يجب أن يكون أكبر من أو يساوي {value} كيلوبايت.",
                numeric:
                    "الحقل {attribute} يجب أن يكون أكبر من أو يساوي {value}.",
                string: "الحقل {attribute} يجب أن يكون أكبر من أو يساوي {value} حرف.",
            },
            hex_color:
                "الحقل {attribute} يجب أن يكون لونًا سداسيًا عشريًا صالحًا.",
            image: "الحقل {attribute} يجب أن يكون صورة.",
            in: "{attribute} المختار غير صالح.",
            in_array: "الحقل {attribute} يجب أن يوجد في {other}.",
            integer: "الحقل {attribute} يجب أن يكون رقمًا صحيحًا.",
            ip: "الحقل {attribute} يجب أن يكون عنوان IP صالحًا.",
            ipv4: "الحقل {attribute} يجب أن يكون عنوان IPv4 صالحًا.",
            ipv6: "الحقل {attribute} يجب أن يكون عنوان IPv6 صالحًا.",
            json: "الحقل {attribute} يجب أن يكون سلسلة JSON صالحة.",
            list: "الحقل {attribute} يجب أن يكون قائمة.",
            lowercase: "الحقل {attribute} يجب أن يكون بأحرف صغيرة.",
            lt: {
                array: "الحقل {attribute} يجب أن يحتوي على أقل من {value} عنصر.",
                file: "الحقل {attribute} يجب أن يكون أقل من {value} كيلوبايت.",
                numeric: "الحقل {attribute} يجب أن يكون أقل من {value}.",
                string: "الحقل {attribute} يجب أن يكون أقل من {value} حرف.",
            },
            lte: {
                array: "الحقل {attribute} يجب ألا يحتوي على أكثر من {value} عنصر.",
                file: "الحقل {attribute} يجب أن يكون أقل من أو يساوي {value} كيلوبايت.",
                numeric:
                    "الحقل {attribute} يجب أن يكون أقل من أو يساوي {value}.",
                string: "الحقل {attribute} يجب أن يكون أقل من أو يساوي {value} حرف.",
            },
            mac_address: "الحقل {attribute} يجب أن يكون عنوان MAC صالحًا.",
            max: {
                array: "الحقل {attribute} يجب ألا يحتوي على أكثر من {max} عنصر.",
                file: "الحقل {attribute} يجب ألا يكون أكبر من {max} كيلوبايت.",
                numeric: "الحقل {attribute} يجب ألا يكون أكبر من {max}.",
                string: "الحقل {attribute} يجب ألا يكون أكبر من {max} حرف.",
            },
            max_digits:
                "الحقل {attribute} يجب ألا يحتوي على أكثر من {max} أرقام.",
            mimes: "الحقل {attribute} يجب أن يكون ملفًا من نوع: {value}s.",
            mimetypes: "الحقل {attribute} يجب أن يكون ملفًا من نوع: {value}s.",
            min: {
                array: "الحقل {attribute} يجب أن يحتوي على الأقل على {min} عنصر.",
                file: "الحقل {attribute} يجب أن يكون على الأقل {min} كيلوبايت.",
                numeric: "الحقل {attribute} يجب أن يكون على الأقل {min}.",
                string: "الحقل {attribute} يجب أن يكون على الأقل {min} حرف.",
            },
            min_digits:
                "الحقل {attribute} يجب أن يحتوي على الأقل على {min} أرقام.",
            missing: "الحقل {attribute} يجب أن يكون مفقودًا.",
            missing_if:
                "الحقل {attribute} يجب أن يكون مفقودًا عندما يكون {other} هو {value}.",
            missing_unless:
                "الحقل {attribute} يجب أن يكون مفقودًا ما لم يكن {other} هو {value}.",
            missing_with:
                "الحقل {attribute} يجب أن يكون مفقودًا عندما تكون {value}s موجودة.",
            missing_with_all:
                "الحقل {attribute} يجب أن يكون مفقودًا عندما تكون {value}s موجودة.",
            multiple_of: "الحقل {attribute} يجب أن يكون مضاعفًا لـ {value}.",
            not_in: "{attribute} المختار غير صالح.",
            not_regex: "صيغة الحقل {attribute} غير صالحة.",
            numeric: "الحقل {attribute} يجب أن يكون رقمًا.",
            password: {
                letters:
                    "الحقل {attribute} يجب أن يحتوي على حرف واحد على الأقل.",
                mixed: "الحقل {attribute} يجب أن يحتوي على حرف كبير وحرف صغير على الأقل.",
                numbers:
                    "الحقل {attribute} يجب أن يحتوي على رقم واحد على الأقل.",
                symbols:
                    "الحقل {attribute} يجب أن يحتوي على رمز واحد على الأقل.",
                uncompromised:
                    "ظهر الـ {attribute} المحدد في تسريب بيانات. يرجى اختيار {attribute} مختلف.",
            },
            present: "الحقل {attribute} يجب أن يكون موجودًا.",
            present_if:
                "الحقل {attribute} يجب أن يكون موجودًا عندما يكون {other} هو {value}.",
            present_unless:
                "الحقل {attribute} يجب أن يكون موجودًا ما لم يكن {other} هو {value}.",
            present_with:
                "الحقل {attribute} يجب أن يكون موجودًا عندما تكون {value}s موجودة.",
            present_with_all:
                "الحقل {attribute} يجب أن يكون موجودًا عندما تكون {value}s موجودة.",
            prohibited: "الحقل {attribute} محظور.",
            prohibited_if:
                "الحقل {attribute} محظور عندما يكون {other} هو {value}.",
            prohibited_unless:
                "الحقل {attribute} محظور ما لم يكن {other} في {value}s.",
            prohibits: "الحقل {attribute} يحظر وجود {other}.",
            regex: "صيغة الحقل {attribute} غير صالحة.",
            required: "الحقل {attribute} مطلوب.",
            required_array_keys:
                "الحقل {attribute} يجب أن يحتوي على إدخالات لـ: {value}s.",
            required_if:
                "الحقل {attribute} مطلوب عندما يكون {other} هو {value}.",
            required_if_accepted:
                "الحقل {attribute} مطلوب عندما يتم قبول {other}.",
            required_if_declined:
                "الحقل {attribute} مطلوب عندما يتم رفض {other}.",
            required_unless:
                "الحقل {attribute} مطلوب ما لم يكن {other} في {value}s.",
            required_with:
                "الحقل {attribute} مطلوب عندما تكون {value}s موجودة.",
            required_with_all:
                "الحقل {attribute} مطلوب عندما تكون {value}s موجودة.",
            required_without:
                "الحقل {attribute} مطلوب عندما لا تكون {value}s موجودة.",
            required_without_all:
                "الحقل {attribute} مطلوب عندما لا تكون أي من {value}s موجودة.",
            same: "الحقل {attribute} يجب أن يتطابق مع {other}.",
            size: {
                array: "الحقل {attribute} يجب أن يحتوي على {size} عنصر.",
                file: "الحقل {attribute} يجب أن يكون {size} كيلوبايت.",
                numeric: "الحقل {attribute} يجب أن يكون {size}.",
                string: "الحقل {attribute} يجب أن يكون {size} حرف.",
            },
            starts_with:
                "الحقل {attribute} يجب أن يبدأ بأحد القيم التالية: {value}s.",
            string: "الحقل {attribute} يجب أن يكون سلسلة نصية.",
            timezone: "الحقل {attribute} يجب أن يكون منطقة زمنية صالحة.",
            unique: "الـ {attribute} تم استخدامه من قبل.",
            uploaded: "فشل تحميل الـ {attribute}.",
            uppercase: "الحقل {attribute} يجب أن يكون بأحرف كبيرة.",
            url: "الحقل {attribute} يجب أن يكون رابطًا صالحًا.",
            ulid: "الحقل {attribute} يجب أن يكون ULID صالحًا.",
            uuid: "الحقل {attribute} يجب أن يكون UUID صالحًا.",

            custom: {
                "attribute-name": {
                    "rule-name": "رسالة مخصصة",
                },
            },

            attributes: {},
        },
        passwords: {
            reset: "تم إعادة تعيين كلمة المرور الخاصة بك.",
            sent: "لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.",
            throttled: "يرجى الانتظار قبل المحاولة مرة أخرى.",
            token: "رمز إعادة تعيين كلمة المرور هذا غير صالح.",
            user: "لا يمكننا العثور على مستخدم بهذا البريد الإلكتروني.",
        },
        messages: {
            lang: {
                en: "الانكليزية",
                ar: "العربية",
            },
            editing_in: "يتم التعديل باللغة {lang}",
            blog: "المدونة",
            home: "الرئيسية",
            admin_panel: "لوحة الإدارة",
            create_post: "إنشاء منشور",
            edit_post: "تعديل المنشور",
            dashboard: "لوحة التحكم",
            edit_profile: "تعديل الملف الشخصي",
            delete_post: "مسح المنشور",
            report: "إبلاغ",
            undo: "تراجع",
            like: "إعجاب",
            comments: "تعليقات",
            comment: "تعليق",
            write_a_thoughtful_comment: "اكتب تعليقًا مدروسًا...",
            new_comments: "تعليقات جديدة",
            top_comments: "أهم التعليقات",
            reply: "رد",
            more_articles: "مقالات أخرى",
            search: "بحث",
            latest: "الأحدث",
            oldest: "الأقدم",
            popular: "الاكثر اعجاب",
            followings: "المتابعين",
            trending: "الشائع",
            post_title_goes_here: "عنوان المنشور هنا",
            write_your_post_in_markdown: "اكتب منشورك باستخدام ماركداون...",
            upload_cover_image: "رفع صورة الغلاف",
            posted: "تم الانشاء",
            edit:"تعديل",
            preview: "معاينة",
            publish: "نشر",
            logout: "تسجيل خروج",
            Create_and_Search_Posts_News_tips_and_best_practices_for_PHP_and_any_technology: "إنشاء والبحث عن منشورات، أخبار، نصائح، وأفضل الممارسات لـ PHP وأي تقنية.",

        },
    },
};