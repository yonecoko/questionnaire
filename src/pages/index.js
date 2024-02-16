import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import { db } from "./api/config/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [q3Answer, setQ3Answer] = useState("");
  const [q4Answer, setQ4Answer] = useState("");

  const handleChangeQ3 = (e) => {
    setQ3Answer(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeQ4 = (e) => {
    setQ4Answer(e.target.value);
    console.log(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
    addDoc(collection(db, "answers"), {
      Question1: data.name,
      Question2: data.birth,
      Question3: data.isLearning,
      Question4: data.wasLearning,
      Question5: data.allLearning,
    });
  };

  useEffect(() => {
    onSnapshot(collection(db, "answers"), (snapshot) => {
      const answers = snapshot.docs.map((doc) => {
        console.log(doc.data());
        return doc.data();
      });
    });
  }, []);

  return (
    <>
      <Container>
        <h1>プログラミング学習に関するアンケート</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1.名前を入力してください(匿名可)</label>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} />
              )}
            />
          </div>
          <div>
            <label htmlFor="birth">Q2.生年月日を入力してください</label>
            <Controller
              name="birth"
              control={control}
              rules={{
                required: true,
                pattern:
                  /^(19|20)[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
              }}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} />
              )}
              defaultValue=""
            />
            {errors.birth && errors.birth.type === "required" ? (
              <span>このフィールドは回答必須です。</span>
            ) : null}
            {errors.birth && errors.birth.type === "pattern" ? (
              <span>整数8桁で入力してください。</span>
            ) : null}
          </div>
          <div>
            <p>Q3.現在、プログラミングを学習していますか？</p>
            <input
              type="radio"
              id="isLearning1"
              name="now"
              {...register("isLearning", {
                required: true,
              })}
              onChange={handleChangeQ3}
              value="yes"
            />
            <label htmlFor="isLearning1">はい</label>

            <input
              type="radio"
              id="isLearning2"
              name="now"
              {...register("isLearning", {
                required: true,
              })}
              value="no"
              onChange={handleChangeQ3}
            />
            <label htmlFor="isLearning2">いいえ</label>

            <input
              type="radio"
              id="isLearning3"
              name="now"
              {...register("isLearning", {
                required: true,
              })}
              value="nothing"
              onChange={handleChangeQ3}
            />
            <label htmlFor="isLearning3">わからない</label>

            {errors.isLearning && <span>このフィールドは回答必須です。</span>}
          </div>
          <div>
            <p>Q4.これまでに、プログラミングを学習したことがありますか？</p>
            <input
              type="radio"
              id="wasLearning1"
              name="was"
              {...register("wasLearning", {
                required: true,
              })}
              value="yes"
              onChange={handleChangeQ4}
            />
            <label htmlFor="wasLearning1">はい</label>
            <input
              type="radio"
              id="wasLearning2"
              name="was"
              {...register("wasLearning", {
                required: true,
              })}
              value="no"
              onChange={handleChangeQ4}
            />
            <label htmlFor="wasLearning2">いいえ</label>
            <input
              type="radio"
              id="wasLearning3"
              name="was"
              {...register("wasLearning", {
                required: true,
              })}
              value="nothing"
              onChange={handleChangeQ4}
            />
            <label htmlFor="wasLearning3">わからない</label>

            {errors.wasLearning && <span>このフィールドは回答必須です。</span>}
          </div>
          {q3Answer === "yes" || q4Answer === "yes" ? (
            <div>
              <p>
                今まで学習したことのあるプログラミング言語をすべて教えてください。
              </p>
              <input type="text" {...register("allLearning")} />
            </div>
          ) : null}
          <input type="submit" value="アンケートを提出する" />
        </form>
      </Container>
    </>
  );
}
